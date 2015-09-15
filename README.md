#Simple Node.js server (<a target="_blank" href="https://ss-thx1138.rhcloud.com">Demo<a>)
##Server side
This is server written on Node.js, it can be launched both in http or https instances.
For data storage it uses MongoDB and mongoose driver.
For generating HTML markup it uses doTjs templating library (there are also Jade templates, but they are deprecated).
Server also uses socket.io as a library for more convenient work with websocket.
### To launch server follow this steps:
  1. install <a target="_blank" href="https://nodejs.org">Node.js<a> and <a target="_blank" href="http://docs.mongodb.org/manual">MongoDB<a>
  2. create folder '/config' and put in it file main.json with content:
    `{<br>
      "server" : {<br>
        "port" : {port int},<br>
        "ip": {ip string}<br>
      },<br>
    "mongo": {<br>
      "uri": {uri_to_connect_mongodb}<br>
    },<br>
    "https": { //optinal<br>
      "cert": {path to certificate file string},<br>
      "key": {path to key file string}<br>
    }<br>
  }`
  3. Run `npm start` to run server (To run https server, you need to put ssl key and certificate files, into '/config' directory and add links to them in main.json).

##Client side
<b>There are several pages available:</b>
#####/
This is simple page that only have links to other pages and welcome text for logged users.
#####/login
Page for login  system.
#####/signup
Page for signing in system.
#####/mypage
Page with todo list table written with the use of React.js. Todo list supports adding, editing and deleting items, it also has pagination.
#####/chat
Primitive chat that uses websocket technology to communicate between chat members. Chat also uses a React with flux pattern.
