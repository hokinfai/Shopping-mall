var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config').config;

var ProductSchema = new Schema({
  name:{type:String, unique:true},
    price:{type:Number},
    category:{type:String},
    detail:{type:String}
})


mongoose.model('Product',ProductSchema);
