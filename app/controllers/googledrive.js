var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../../client_secret');

//var TOKEN_PATH = require('../../drive-nodejs-quickstart');
//const keys = require('../../client_secret');
//const sampleClient = require('../../sampleclient');
//var SCOPES = ['https://www.googleapis.com/auth/drive'];

exports.getContents = function(req, res, next){
  var SCOPES = ['https://www.googleapis.com/auth/drive'];
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
  // Load client secrets from a local file.
  //res.json(TOKEN_PATH);
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    //authorize(JSON.parse(content), getFileContents);
    res.json(content);
  });
}






exports.getContents2 = function(req, res, next){
  /**/
  var drive = google.drive('v3');
  /**/
  var auth3 = google.auth.OAuth2;
  /**
  var auth =  new OAuth2(
    key.client_id,
    key.client_secret,
    key.redirect_uris[0]
  );
  /**
  auth2 = new OAuth2Client(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
  );
  /**
  google.options({
    auth: auth
  });
  /**
  auth.setCredentials({
    access_token: 'ACCESS TOKEN HERE',
    refresh_token: 'REFRESH TOKEN HERE'
    // Optional, provide an expiry_date (milliseconds since the Unix Epoch)
    // expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
  });
  /**
  var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    null
  );
  /**
  jwtClient.authorize( function(err, tokens) {
      if(err){
        res.json(err);
        return;
      }
      /**/
      drive.files.export({
        fileId: '1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs',
        mimeType: 'text/plain',
        auth: auth3
      }, /**{
        encoding: null // Make sure we get the binary data
      },/**/ function (err, content){
        if(err){
          res.json(err);
          return next(err);
        }
        res.json(content);
      });/**
  });
  /**/
}
