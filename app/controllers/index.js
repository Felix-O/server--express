var User = require('../models/user');

exports.users = function(req, res, next){

  User.find({}, function(err, usersExist){
    if(err){
      return(next);
    }

    if(usersExist){
      return res.status(200).send({data: 'There is data'});
    }

    res.json();

  });
}
