#Simple Node.js server
##Server side
This is server written on Node.js, it can be launched both on http or https instance.
For data storage it uses MongoDB and mongoose driver.
For generating HTML markup it uses doTjs templating library (there are also Jade templates, but they are deprecated).
Server also uses socket.io as a library for more convenient work with websocket.
### To launch server follow this steps:
  1. install Node.js and MongoDB
  2. run `npm install`
  3. create folder '/config' and put in it file main.json with content:
    `{
      "port" : {port int},
      "session": {
        "secret": {your_secret string},
        "key": {your_key string},
        "cookie": {
          "maxAge": {cookie_age milliseconds},
          "httpOnly": true
        }
      },
    "mongo": {
      "host": "localhost",
      "db": {db_name},
      "port": {mongo_db_port |default 27017},
      "uri": {uri_to_connect_mongodb}
    }
  }`
  4. Run 'node server':
    </br>4.1 `node server` or `node server --https=false` will run http server
    </br>4.2 `node server -https=true` or `node server --https=true` will run https server, but to do that you need to put 'server.key' and 'server.crt', ssl key and certificate files respectively, into config directory.
    Then application will print in console which server is running, go to {http|| https}://localhost:1337/ to see the result.

##Client side
<b>There are several pages available:</b>
#####/
  This is simple page that only have links to other pages and welcome text for logged users.
######/login
  Page for login  system.
#####/signup
  Page for signing in system.
#####/mypage
  Page with todo list table written with the use of React.js. Todo list supports adding, editing and deleting items, it also has pagination.
#####/chat
  Primitive chat that uses websocket technology to communicate between chat members. Chat also uses a React with flux pattern.
###To build UI follow this steps:
  1. go to ui folder and run `npm install` 
  2. then run `webpack` (to do this you must install ~webpack~ globally!)
