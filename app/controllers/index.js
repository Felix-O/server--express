var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, 'firstname lastname username', function(err, users) {
    var userMap = {};
    //var userData;

    users.forEach(function(user) {
      userMap[user._id] = user._id;
      //userData = user._id;
    });

    res.json(users);
  });
}

exports.user = function(req, res, next){

  var id = req.body;

  User.findById( id , 'firstname lastname username', function(err, user) {
    res.send(user);
  });
}
