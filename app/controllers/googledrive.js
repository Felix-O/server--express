var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var sampleClient = require('../../sampleclient');

exports.getContents = function(req, res, next){/**/
  var auth = google.auth.OAuth2;
  var drive = google.drive('v3');
  drive.files.export({
    fileId: "1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs",
    mimeType: 'text/html',
    //auth: sampleClient.oAuth2Client
  }, function (err, content){
    if(err){
      res.json(err);
      return next(err);
    }
    res.json(content);
  });/**/
  //res.json(auth);
}
