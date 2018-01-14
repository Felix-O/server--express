var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../../client_secret');
var OAuth2 = google.auth.OAuth2;

//var TOKEN_PATH = require('../../drive-nodejs-quickstart');
//const keys = require('../../client_secret');
//const sampleClient = require('../../sampleclient');
//var SCOPES = ['https://www.googleapis.com/auth/drive'];

exports.getContents = function(req, res, next){/**/
  var drive = google.drive('v2');
  var jwtClient = new.auth.JWT(
    key.client_id,
    //null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    //null,
  );

  var auth =  new OAuth2(
    "602320724221-131812hpjagaetm44p08obaip3vmmcn3.apps.googleusercontent.com",
    "-fXm21-p5yxgkUeeO_d9bqgF",
    "urn:ietf:wg:oauth:2.0:oob"
  );
  google.options({
    auth: auth
  });/**/

  /*jwtClient.authorize( function(err, tokens) {
      if(err){
        res.json(err);
        return;
      }/*jwtClient*/

      drive.files.export({
        fileId: '1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs',
        mimeType: 'text/html',
        auth: auth
      }, /**/{
        encoding: null // Make sure we get the binary data
      },/**/ function (err, content){
        if(err){
          res.json(err);
          return next(err);
        }
        res.json(content);
      });/**/
  //jwsClient});
}
