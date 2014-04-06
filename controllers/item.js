
var User = require('../proxy').User;
var Product = require('../proxy').Product;
var config = require('../config').config;
var fs = require('fs');

exports.food = function  (req,res,next) {
    var pr = [];
  Product.getProductByCate('Food', function  (err, product) {
    product.forEach(function  (item, index) {
      pr.push(item);
    })
    console.log(pr);
    product.forEach(function  (item, index) {
      //console.log(index);
      //console.log(item);
      //console.log(fs.readdirSync(config.imagePath+item.name)[0])
      pr[index].imgPath = '/' + item.name + '/mini.' + fs.readdirSync(config.imagePath+item.name)[0];
    })
    console.log(pr[0].imgPath);
    console.log(pr);
    res.render('food1', {title:'food', product:pr})
  })
};

exports.coffeeTable = function  (req,res,next) {
  res.render('coffeeTable', {title:'coffeeTable', name:'锁妃', price:999, category:"what", detail:"锁爱妃", imgURL:['/cwp/image/water.jpg']});
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

exports.detail = function  (req, res, next) {
  console.log('here it is');
  function notMini (element) {
    return !(/.*mini.*/.test(element));
  }
  Product.getProductByName(req.params.productName, function  (err, pro) {
    fs.readdir(config.imagePath+pro.name, function  (err, files) {
      if(err){
        req.flash('error', 'This product does not exist');
        return res.redirect('/');
      }
      var imgURL = [];
      files.filter(notMini).forEach(function  (elem) {
        imgURL.push('/' +pro.name + '/' +elem);
      });
      console.log(imgURL);
      res.render('coffeeTable', {title:pro.name, name:pro.name, price:pro.price, category:pro.category, detail:pro.detail, imgURL:imgURL});
    })
  });
}



