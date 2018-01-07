var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      //userMap[user._id] = user;
      userMap = user;
    });

    res.send(userMap);
  });
}
