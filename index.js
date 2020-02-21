// Monkey patch before you require http for the first time.
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const random = require('random')
var xmlParser = require('xml2json')
var request = require('request')
var express = require('express')
var express_graphql = require('express-graphql')
var config = require('./config')
var cors = require('cors')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var {
    buildSchema
} = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        hello: String
        user(email: String, phone: String): User
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
        createUser(name: String!, email: String!, phone: String!): User
    }
    type User {
        name: String
        email: String
        phone: String
        password: String
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var usersData = []

var coursesData = [{
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]
var getCourse = function (args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
var getCourses = function (args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

var getUser = function (args) {
    var phone = args.phone;
    return usersData.filter(user => {
        return user.phone == phone;
    })[0];
}
var getUsers = function (args) {
    return usersData;
}

var createUser = async function (args) {
    var user = {
        name: args.name,
        email: args.email,
        phone: args.phone,
        description: "USER CREATED ON SEDE",
        activeTime: "30 Min",
        accessTime: "Allowed all the time",
        limitData: "100 MB",
        countSms: 0
    }
    user.password = random.int(min = 1000, max = 9999)
    url = 'https://50.50.40.1:4445/webconsole/APIController?reqxml=<Request><Login><Username>developer</Username><Password>Desarrollo20</Password></Login>'
    url += '<Set operation="add user"><User><Username>' + user.phone + '</Username><Name>' + user.name + '</Name>'
    url += '<Password>' + user.password + '</Password><UserType>User</UserType><Profile>none</Profile>'
    url += '<EmailList><EmailID>' + user.email + '</EmailID></EmailList><Group>Guest Group</Group>'
    url += '<Description>' + user.description + '</Description><SurfingQuotaPolicy>' + user.activeTime + '</SurfingQuotaPolicy>'
    url += '<AccessTimePolicy>' + user.accessTime + '</AccessTimePolicy><DataTransferPolicy>' + user.limitData + '</DataTransferPolicy>'
    url += '<QoSPolicy>QoS INVITADO</QoSPolicy><SSLVPNPolicy>none</SSLVPNPolicy><ClientlessPolicy>none</ClientlessPolicy><L2TP>Disable</L2TP><L2TPIp>none</L2TPIp><PPTP>Disable</PPTP><PPTPIp>none</PPTPIp><IsEncryptCert>Disable</IsEncryptCert>'
    url += '<CISCO>Disable</CISCO><CISCOIP>none</CISCOIP><QuarantineDigest>Disable</QuarantineDigest><SimultaneousLoginsGlobal>Disable</SimultaneousLoginsGlobal><SimultaneousLogins>Unlimited</SimultaneousLogins><MACBinding>Disable</MACBinding>'
    url += '<MACAddressList><MACAddress>none</MACAddress><MACAddress>none</MACAddress><MACAddress>none</MACAddress></MACAddressList><LoginRestriction>AnyNode</LoginRestriction><NodeList><IPAddress>none</IPAddress></NodeList><FromIP>none</FromIP><ToIP>none</ToIP>'
    url += '<ScheduleForApplianceAccess>All The Time</ScheduleForApplianceAccess><LoginRestrictionForAppliance>AnyNode</LoginRestrictionForAppliance><AdminAccessNodeList><IPAddress>none</IPAddress></AdminAccessNodeList><AdminAccessFromIP>none</AdminAccessFromIP><AdminAccessToIP>none</AdminAccessToIP>'
    url += '<Status>active</Status></User></Set></Request>'
    request(url, (error, response, body) => {
        console.error('error:', error)
        console.log('statusCode:', response && response.statusCode)
        console.log('body:', body)
        var response = JSON.parse(xmlParser.toJson(body)).Response
        var responseCode = response.User.Status.code
        var responseText = response.User.Status['$t']
        if (responseCode == "200" && responseText == "Configuration applied successfully.") {
            var smsResponse = sendSMS(user.phone, "Bienvenido a Platanitos.com, la password para tu usuario " + user.phone + " hoy es : " + user.password)
            var countSms = user.countSms + (smsResponse ? 1 : 0)
            user.countSms = countSms
            usersData.push(user)
            console.log(usersData)
            return usersData.filter(user => user.phone === args.phone)[0]
        }
    })
    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password
    }
}

async function sendSMS(phone, sms) {
    var url = "http://172.16.20.240/cgi/WebCGI?1500101=account=platanitos&password=platanitos&port=1&destination=" + phone + "&content=" + sms + ""
    request(url, function (error, response, body) {
        console.error('error:', error)
        console.log('statusCode:', response && response.statusCode)
        console.log('body:', body)
        var responseText = /Success/.test(body)
        var responseMessage = /Commit successfully!/.test(body)
        if (responseText == true && responseMessage == true) {
            return true
        }
    })
}

var updateCourseTopic = function ({
    id,
    topic
}) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}

var saludo = function (args) {
    return 'Hello world!'
}

var root = {
    hello: saludo,
    user: getUser,
    users: getUsers,
    createUser: createUser,
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(
    config.get('app.port'),
    () => console.log('Express GraphQL Server Now Running On localhost:' + config.get('app.port') + '/graphql')
);