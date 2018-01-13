var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var TOKEN_PATH = require('../../drive-nodejs-quickstart');

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
  //var auth = new googleAuth();
  var drive = google.drive('v3');
  drive.files.export({
    fileId: "1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs",
    mimeType: 'text/html',
    auth: auth
  }, function (err, content){
    if(err){
      res.json(err);
      return next(err);
    }
    res.json(content);
  });/**/
  //res.json(auth);
}
