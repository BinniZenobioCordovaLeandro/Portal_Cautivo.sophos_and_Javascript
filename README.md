# PORTAL CAUTIVO EN SOPHOS USANDO JAVASCRIPT (front-end => API JavaScript => API SOPHOS)

## Request to use on API 17.2 on SOPHOS

Create Sophos User
```http
https://50.50.40.1:4445/webconsole/APIController?reqxml=<Request><Login><Username>developer</Username><Password>Desarrollo20</Password></Login><Set operation="add user"><User><Username>Cliente</Username><Name>Cliente</Name><Password>passcliente</Password><UserType>User</UserType><Profile>none</Profile><EmailList><EmailID>jmontoya@platanitos.com</EmailID></EmailList><Group>Guest Group</Group><Description>JONATHAN2</Description><SurfingQuotaPolicy>30 Min</SurfingQuotaPolicy><AccessTimePolicy>Allowed all the time</AccessTimePolicy><DataTransferPolicy>100 MB</DataTransferPolicy><QoSPolicy>QoS INVITADO</QoSPolicy><SSLVPNPolicy>none</SSLVPNPolicy><ClientlessPolicy>none</ClientlessPolicy><L2TP>Disable</L2TP><L2TPIp>none</L2TPIp><PPTP>Disable</PPTP><PPTPIp>none</PPTPIp><IsEncryptCert>Disable</IsEncryptCert><CISCO>Disable</CISCO><CISCOIP>none</CISCOIP><QuarantineDigest>Disable</QuarantineDigest><SimultaneousLoginsGlobal>Disable</SimultaneousLoginsGlobal><SimultaneousLogins>Unlimited</SimultaneousLogins><MACBinding>Disable</MACBinding><MACAddressList><MACAddress>none</MACAddress><MACAddress>none</MACAddress><MACAddress>none</MACAddress></MACAddressList><LoginRestriction>AnyNode</LoginRestriction><NodeList><IPAddress>none</IPAddress></NodeList><FromIP>none</FromIP><ToIP>none</ToIP><ScheduleForApplianceAccess>All The Time</ScheduleForApplianceAccess><LoginRestrictionForAppliance>AnyNode</LoginRestrictionForAppliance><AdminAccessNodeList><IPAddress>none</IPAddress></AdminAccessNodeList><AdminAccessFromIP>none</AdminAccessFromIP><AdminAccessToIP>none</AdminAccessToIP><Status>active</Status></User></Set></Request>
```

Delete Sophos User
```http
https://50.50.40.1:4445/webconsole/APIController?reqxml=<Request><Login><Username>developer</Username><Password>Desarrollo20</Password></Login><Remove><User><Name>cliente</Name></User></Remove></Request>
```

## Request to use on GATEWAY API to send a SMS

```http
http://172.16.20.240/cgi/WebCGI?1500101=account=platanitos&password=platanitos&port=1&destination=936133268&content=password
```