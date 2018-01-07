var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, function(err, users) {
    var userMap = {};
    var userID;

    users.forEach(function(user) {
      //userMap[user.firstname] = user;
      userID = user._id;
      res.send(userID);
    });

    //res.send(userMap);
  });
}
