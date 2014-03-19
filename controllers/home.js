//用户名长度在6-12之间
var minUnLength = 5;
var maxUnLength = 13;
//密码长度在6-16之间
var minPwLength = 5;
var maxPwLength = 17;

var fs = require('fs');
var User = require('../proxy').User;
var validator = require('validator');
var crypto = require('crypto');
var config = require('../config').config;
var Product = require('../proxy').Product;
var util = require('util');

/*
 * GET home page.
 */

exports.checkLogin = function  (req,res,next) {
  if (!req.session.user) {
    req.flash('error','You haven\'t logged in');
    return res.redirect('/login');
  }
  next();
};

exports.checkNotLogin = function  (req,res,next) {
  if (req.session.user) {
    req.flash('error','You have already logged in');
    return res.redirect('/');
  }
  next();
};


exports.homepage = function(req, res){
  //Render a view with a callback responding with the rendered string
  res.render('home', { title: 'Home' });
};

//go to login page
exports.loginPage = function(req,res){
  res.render('login',{title:'login'});
}

//go to register page
exports.registerPage = function(req,res){
  res.render('register',{title:'register'});
}

/*
 *用户名在6-12之间，密码长度在9-17之间
 *两者都不能为空
 *只能包括字母和数字
 */
exports.register = function  (req,res,next) {

  console.log('In funtion'+' register'.func);

  //trim -- remove white space from both sides of a string
  var username = req.body.username.trim();
  var password = req.body.password.trim();
  var email = req.body.email.trim();
  var addr = req.body.addr.trim();

  //prove null password or username
  if (username === '' || password === '' || email === '' || addr ==='') {
    req.flash('error','information is incomplete');
    return res.redirect('/register');
  }

  //用户名长度在6-12之间
  //密码长度在9-17之间
  if (!(minUnLength<username.length < maxUnLength) || !(minPwLength < password.length < maxPwLength)) {
    req.flash('error','The username should around ' + (minUnLength+1) + '-' + (maxUnLength-1)+ 'length and the password should around ' + (minPwLength + 1) + '-' + (maxPwLength - 1) + 'length');
    return res.redirect('/register');
  }
  //isalphanumeric -- contains only letters and numbers
  if (!validator.isAlphanumeric(username) || !validator.isAlphanumeric(password)) {
    req.flash('error','username and password should only contain letters and numbers')
      return res.redirect('/register');
  }

  if (!validator.isEmail(email)) {
    req.flash('error','This is not a valid email address');
    return res.redirect('/register');
  }


  User.newAndSave(username,md5(password),email,addr,function  (err) {
    console.log('In function' +  'User.newAndSave'.func);
    if (err) {
      req.flash( 'error', 'Duplicate email registered' );
      return res.redirect('/register');
    }
    req.flash( 'success', 'Registration Successful' );
    return res.redirect('/');
  })
};

// auth_user middleware
exports.auth_user = function (req, res, next) {
  if (req.session.user) {
    //if (req.session.user.hasOwnProperty("vendor")) {
    //req.session.user.is_admin = true;
    //}
    //res.locals.current_user = req.session.user;
    console.log('The user ' + req.session.user.username.log + ' has its session');
    return next();
  } else {
    //console.log("print the cookies at 90");
    //console.log(req.cookies);
    var cookie = req.cookies[config.auth_cookie_name];
    //console.log(cookie);
    if (!cookie) {
      return next();
    }
    //解密
    var auth_token = decrypt(cookie, config.session_secret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    User.getUserById(user_id, function (err, user) {
      //console.log(user);
      if (err) {
        return next(err);
      }
      if (user) {
        //if (config.admins.hasOwnProperty(user.username)) {
        //user.is_admin = true;
        //}

        //res.locals.current_user = req.session.user;
        //因为目前没有session, 所以要设定session的user
        req.session.user = user;
        console.log('The new session is');
        console.log(util.inspect(user).print);
        return next();
      } else {
        return next();
      }
    });
  }
};



exports.login = function (req, res, next) {
  var email = req.body.email.trim();
  var password = req.body.password.trim();

  if (!email || !password) {
    req.flash( 'error', 'you haven\' filled out the form' );
    return res.redirect('/login');
  }

  User.getUserByEmail(email, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash( 'error', 'The username doesn\'t exist' );
      return res.redirect('/login');
    }
    password = md5(password);
    if (password !== user.password) {
      req.flash( 'error' ,'password error');
      return res.redirect('/login');
    }
    // store session cookie
    gen_session(user, res);
    req.session.user = user;
    res.redirect('/');
  });
};

exports.logout = function (req, res, next) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect('/');
};

//使用md5加密
function md5 (str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

//private
function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.email + '\t' + user.password + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

exports.gen_session = gen_session;

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

exports.test = function  (req, res, next) {
  res.render('test', {title:"hah"});
}

exports.getimage = function  (req, res, next) {
    console.log('wocao');
    return;
}

exports.myCart = function  (req, res, next) {
    res.render('myCart', {title:"myCart"});
}
