var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, 'firstname lastname username email role', function(err, users) {
    /*var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user._id;
    });/**/

    res.json(users);
  });
}


exports.user = function(req, res, next){
  var username = req.body;
  res.json("username");
  /*User.find( {username: username} , 'firstname lastname username email role', function(err, user) {
    res.json(user);
  });/**/
}/**/
