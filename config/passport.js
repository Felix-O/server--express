var passport = require('passport');
var User = require('../app/models/user');
var config = require('./auth');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var facebookStrategy = require('passport-facebook').Strategy;


var localOptions = {
    usernameField: 'email'
};



var localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({
        email: email
    }, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){
                return done(err);
            }
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
            return done(null, user);
        });
    });
});



var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};



var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload._id, function(err, user){
        if(err){
            return done(err, false);
        }
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});


/**/
var googleLogin = new googleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  //callbackURL: config.googleAuth.callbackURL
},
  function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne({'email': profile.email}, function(err, user){
        if(err){
          return done(err);
        }
        if(user){
          return done(null, user);
        }
        else {
          var newUser = new User();
          newUser.googleID = profile.id;
          newUser.googleToken = accessToken;
          newUser.googleName = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.save(function(err){
            if(err){
              throw err;
            }
            return done(null, newUser);
          })
        }
      })
    });
  })
});
/**/

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
