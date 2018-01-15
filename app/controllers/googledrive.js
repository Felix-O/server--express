var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../../client_secret');

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
      res.json('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), getFileContents);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(/*TOKEN_PATH*/'drive-nodejs-quickstart.json', function(err, token) {
      if (err) {
        //getNewToken(oauth2Client, callback);
        return;//added
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  function storeToken(token) {
    try {
      fs.mkdirSync(/*TOKEN_DIR*/'/');
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(/*TOKEN_PATH*/'drive-nodejs-quickstart.json', JSON.stringify(token));
    console.log('Token stored to ' + /*TOKEN_PATH*/'drive-nodejs-quickstart.json');
  }

  /**
   * Lists the names and IDs of up to 10 files.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
   function getFileContents(auth) {
     var service = google.drive('v3');
     service.files.export({
       fileId: '1b9-g-UmigkbejOk5LNeig-Epcxghs2pPDCkRWBBnd68',
       mimeType: 'text/html',
       prettyPrint: true,
       auth: auth
     }, function(err, contents){
       if(err){
         return;
       }
       res.json(contents)
     });
   }

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
