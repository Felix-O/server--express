
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var auth = new googleAuth();

var drive = google.drive({
  version: 'v3',
  auth: auth
});

exports.getContents = function(req, res, next){
  drive.files.get({
    fileId: "1q2VD0k1xStuqEkTYSXwTDusn6mpsutWt8FpoI9h9VGs"
  }, function (err, metadata){
    if(err){
      return next(err);
    }
    res.send(metadata.name);
  });
}
