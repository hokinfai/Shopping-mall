var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config').config;

var UserSchema = new Schema({
  email:{type:String, unique:true},
  username:{type:String},
  password:{type:String},
  addr:{type:String},
  comment_list:[String],
}
)

mongoose.model('User',UserSchema);
