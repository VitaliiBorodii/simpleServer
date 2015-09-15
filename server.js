var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('express-dot-engine');
var tempEngine = 'dot';
var db = require('./libs/mongo');
var config = require('./libs/config');
var io = require('socket.io');


var app = express();
var session = require('./libs/session')(config);
var routes = require('./routes');
var port = config.get('server:port');
var ip = config.get('server:ip');

app.set('port', port);
app.set('ip', ip);

// decide to launch http or https server
var https = config.get('https');
var protocol = https ? 'https' : 'http';
var serverCore = require(protocol),
    server;
if (!https) {
    server = serverCore.createServer(app);
} else {
    var credentials = {
        key: fs.readFileSync('./config/' + https.key, 'utf8'),
        cert: fs.readFileSync('./config/' + https.cert, 'utf8')
    };

    server = serverCore.createServer(credentials, app);
}


//websocket
var websocket = require('./libs/websocket');
var socket = io.listen(server);
websocket(socket, session);
// view engine setup
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'views', tempEngine));
app.set('view engine', tempEngine);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

//routes and session
app.use(session);
routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var dev = (app.get('env') === 'development');
//error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.format({
      text: function () {
        res.send(err.message);
      },
      html: function () {
        res.render('error', {
          title: 'Error',
          logged: !!req.session.userId,
          message: err.message,
          error: dev ? err : {}
        });
      },
      json: function () {
        res.send({content: err.message, success: false});
      }
    });
  });
server.listen(port, ip, function () {
    console.log("✔ Server listening at %s://%s:%d ", protocol, ip, port);
});
module.exports = app;