var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');



function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}



function setUserInfo(request){
    return {
        _id: request._id,
        firstname: request.firstname,
        lastname: request.lastname,
        username: request.username,
        email: request.email,
        role: request.role
    };
}



exports.login = function(req, res, next){

    var userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
}



exports.register = function(req, res, next){

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({email: email}, function(err, existingUser){

        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }

        /*
        if(existingUser.username == username){
            return res.status(422).send({error: 'That username is already in use'});
        }/**/

        var user = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            role: role
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
}



exports.roleAuthorization = function(roles){

    return function(req, res, next){

        var user = req.user;

        User.findById(user._id, function(err, foundUser){

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
        });
    }
}

exports.update = function(req, res, next){

    var userUpdates = {
      _id: req.body._id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      //username: req.body.username,
      //email: user.email,
      //password: user.password,
      //role: user.role
    };
/**/
    User.update({_id: userUpdates._id}, {$set: {firstname: userUpdates.firstname, lastname: userUpdates.lastname/*, username: userUpdates.username/**/}}, function(err, raw){
      if (err) {
        return next(err);
      }
      if (raw) {
        res.json(req.body);
      }
    });
/**/
}

exports.delete = function(req, res, next){
    var id = req;
    User.findOneAndRemove({_id: id}, function(err){
      if (err) {
        res.json(err);
        return next(err);
      }
      return res.status(200).send();
    });
}
