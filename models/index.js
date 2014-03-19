var mongoose = require('mongoose');
var config = require('../config').config;


mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./product');

exports.User = mongoose.model('User');
exports.Product = mongoose.model('Product');

