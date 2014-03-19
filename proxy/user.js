var models = require('../models');
var User = models.User;

exports.newAndSave = function  (username,password,email,addr,callback) {
    var user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.addr = addr;
    user.save(callback);
};

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByEmail = function (email, callback) {
  User.findOne({'email': email}, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, callback) {
  User.findOne({_id: id}, callback);
};


