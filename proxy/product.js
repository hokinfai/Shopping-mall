var models = require('../models');
var Product = models.Product;

exports.newProductSave = function  (name, price, category, detail, callback) {
  var product = new Product();
  product.name = name;
  product.price = price;
  product.category = category;
  product.detail = detail;
  product.save(callback);
}


exports.getProductByName = function (name, callback) {
  Product.findOne({'name': name}, callback);
};

exports.getProductByCate = function  (category, callback) {
    Product.find({'category':category}, callback);
}
