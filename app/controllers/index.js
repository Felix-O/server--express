var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, function(err, users) {
    var userMap = {};
    var userData = users;

    users.forEach(function(user) {
      userMap[id] = user._id;
      //userData = user._id;
    });

    res.send(userData);
  });
}
