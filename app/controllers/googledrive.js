var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var TOKEN_PATH = require('../../drive-nodejs-quickstart');
var OAuth2 = google.auth.OAuth2;
//const keys = require('../../client_secret');

//const sampleClient = require('../../sampleclient');


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
//var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    //process.env.USERPROFILE) + '/.credentials/';
//var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

console.log(TOKEN_PATH);

exports.getContents = function(req, res, next){/**/
  var auth =  new OAuth2(
  "602320724221-131812hpjagaetm44p08obaip3vmmcn3.apps.googleusercontent.com",
  "-fXm21-p5yxgkUeeO_d9bqgF",
  "urn:ietf:wg:oauth:2.0:oob"
);
  var drive = google.drive('v3');
  drive.files.export({
    fileId: "1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs",
    mimeType: 'application/json',
    auth: auth
  }, function (err, content){
    if(err){
      res.json(err);
      return next(err);
    }
    res.json(JSON.parse(content));
  });/**/
  //res.json(auth);
}
