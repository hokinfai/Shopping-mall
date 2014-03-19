var User = require('../proxy').User;
var config = require('../config').config;

exports.changePassword = function  (req,res,next) {
  res.render('changePassword', {title:'changePassword'});
};
