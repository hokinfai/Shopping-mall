var User = require('../proxy').User;
var config = require('../config').config;

exports.food = function  (req,res,next) {
  res.render('food1', {title:'food'})
};

exports.coffeeTable = function  (req,res,next) {
  res.render('coffeeTable', {title:'coffeeTable', name:'sandy哥', price:999, category:"what", detail:"sandy哥最美", imgURL:['/cwp/konglong.jpg']});
};
exports.laptop = function  (req,res,next) {
  res.render('laptop', {title:'laptop'})
};
exports.bedroom = function  (req,res,next) {
  res.render('bedroom', {title:'bedroom'})
};

exports.mobile = function  (req,res,next) {
  res.render('mobile', {title:'mobile'})
};




