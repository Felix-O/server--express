var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

exports.getContents = function(req, res, next){/**/
  var auth = google.auth.OAuth2;
  var drive = google.drive({
    version: 'v3',
    auth: auth
  });
  drive.files.export({
    fileId: "1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs",
    mimeType: 'text/html'//,
    auth: auth
  }, function (err, content){
    if(err){
      return next(err);
    }
    res.json(content);
  });/**/
}
