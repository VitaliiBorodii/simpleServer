var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var engine = require('express-dot-engine');
var tempEngine = 'dot';
var db = require('./libs/mongo');
var expressSession = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(expressSession);
var config = require('./libs/config');
var session = expressSession({
  cookie: config.get('session:cookie'),
  key: config.get('session:name'),
  secret: config.get('session:secret'),
  store: new MongoDBStore({
    uri: config.get('mongo:uri')
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true
});
var auth = require('./libs/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');
var login = require('./routes/login');
var logout = require('./routes/logout');
var todos = require('./routes/todos');
var messages = require('./routes/messages');
var app = express();
var server = http.createServer(app);
var sharedsession = require("express-socket.io-session");
var wsHandler = require('./libs/websocket');
var io = require('socket.io').listen(server);
io.use(sharedsession(session, {
  autoSave: true
}));

io.on('connection', wsHandler);

// view engine setup
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'views', tempEngine));
app.set('view engine', tempEngine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);

app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use(express.static('public'));

app.use(auth);
app.use('/mypage', users);
app.use('/chat', chat);
// REST API
app.use('/todos', todos);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var dev = (app.get('env') === 'development');
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

server.listen(config.get('port'));
console.log('\x1b[32mServer is running on \x1b[0m\x1b[35m' + config.get('port') + '\x1b[0m port');
module.exports = app;
