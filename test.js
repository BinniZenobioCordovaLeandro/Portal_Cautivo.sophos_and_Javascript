var request = require('request')

// GET REQUEST ON NODE.js !
var url = 'http://localhost:4000/graphql?query={user(email:"binni_2000_cordova@gmail.com",phone:"936133268"){name,email,phone}}'
request(url, (error, response, body) => {
    console.error('error:', error)
    console.log('statusCode:', response && response.statusCode)
    console.log('body:', body)
})


// POST REQUEST ON NODE.js !
var options = {
    'method': 'POST',
    'url': 'http://localhost:4000/graphql',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "query": "mutation createUser($name: String!, $email: String!, $phone: String!) {createUser(name: $name, email: $email, phone: $phone) {...userFields}} fragment userFields on User { name email phone password}",
        "variables": {
            "name": "binni zenobio cordova leandro",
            "email": "binni_2000_cordova@gmail.com",
            "phone": "936133268"
        }
    })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});