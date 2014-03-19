/**
 * Module dependencies.
 */

var flash = require('connect-flash');
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var app = express();
var partials = require('express-partials');

app.configure(function(){
  // all environments
  // app.set -- assign setting name to value
  app.set('port', process.env.PORT || 3000);
  // The name of the directory that the currently executing script resides in.
  // console.log(__dirname) ==> 本地的绝对路径
  // path.join 两个路径拼起来
  app.set('views', path.join(__dirname, 'views'));
  //模版引擎
  app.set('view engine', 'ejs');

  //Use the given middleware function, with optional mount path, defaulting to "/".
  // efficient favicon server (with default icon)
  app.use(express.favicon());
  //都在 http://www.senchalabs.org/connect/
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, '/images')));
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: './images' }));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, '/bower_components')));
  app.use(express.static(path.join(__dirname, '/images')));
  //Parses the Cookie header field and populates req.cookies with an object keyed by the cookie names. Optionally you may enabled signed cookie support by passing a secret string.
  app.use(express.cookieParser('shopmall'));
  app.use(express.session({ cookie: { maxAge: 3600000 }}));
  app.use(require('./controllers/home').auth_user);
  app.use(partials());
  app.use(flash());

  app.use(function(req,res,next) {
    //Application local variables are provided to all templates rendered within the application. This is useful for providing helper functions to templates, as well as app-level data.
    //res.locals.user = req.session.user;
    var err = req.flash('error');
    res.locals.error = err.length ? err:null;
    var succ = req.flash('success');
    res.locals.success = succ.length ? succ:null;
    res.locals.login = req.session.user;
    if (req.session.user) {
      var admin = req.session.user.admin;
      res.locals.admin = admin ? admin:null;
    }else{
      res.locals.admin = null;
    }
    res.locals.url = req.url;
    next();
  });

  app.use(app.router);
})

//express支持两种运行模式：开发模式和产品模式，前者的目的利于调试，后者利于部署
// development only

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//Get setting name value.
//app.get('title');
//// => undefined

//app.set('title', 'My Site');
//app.get('title');
//// => "My Site"

app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
});

routes(app);

module.exports = app;
