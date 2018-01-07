var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, function(err, users) {
    var userMap = {};
    var userID;

    users.forEach(function(user) {
      userMap[] = user;
    });

    res.send(userMap);
  });
}
