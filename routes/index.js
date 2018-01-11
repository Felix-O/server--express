var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var AuthenticationController = require('../app/controllers/authentication');
var IndexController = require('../app/controllers/index');
var passportService = require('../config/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
  requireLogin = passport.authenticate('local', {session: false});

var uriTestDb = "mongodb://Felix-O:bustmup@cluster0-shard-00-00-3xrpm.mongodb.net:27017,cluster0-shard-00-01-3xrpm.mongodb.net:27017,cluster0-shard-00-02-3xrpm.mongodb.net:27017/data_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Server' });
});

/**
router.get('/test', AuthenticationController.test);
router.get('/test2', passportService.test2);
/**/

/**/
  router.post('/api/auth/register', AuthenticationController.register);
  router.post('/api/auth/login', requireLogin, AuthenticationController.login);

  router.get('/api/auth/protected', requireAuth, function(req, res){
      res.send({ content: 'Success'});
  });

  router.put('/api/auth/update', AuthenticationController.update);
  router.post('/api/auth/delete', AuthenticationController.delete);
  router.get('/api/index/users', IndexController.users);
  router.get('/api/index/user', IndexController.user);
/**/

router.get('/getData', function(req, res, next) {
  MongoClient.connect(uriTestDb, function(err, db) {
    var resultArray = [];

    assert.equal(null, err);

    var cursor = db.collection('bbrr').find();

    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      res.json(resultArray);
      db.close();
    });
  });
});

router.post('/postData', function(req, res, next){
  var item = {
    player: req.body.player,
    main: req.body.main,
    rank: req.body.rank
  };

  MongoClient.connect(uriTestDb, function(err, db){
    assert.equal(null, err);
    db.collection('bbrr').insertOne(item, function(err, result){
      assert.equal(null, err);
      res.json('Data recieved');
      db.close();
    });
  });
  //res.redirect('/');
});

router.put('/putData', function(req, res, next) {
  var item = {
    player: req.body.player,
    main: req.body.main,
    rank: req.body.rank
  };
  var id = req.body.id;

  MongoClient.connect(uriTestDb, function(err, db){
    assert.equal(null, err);
    db.collection('bbrr').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      assert.equal(null, err);
      res.json('Item updated');
      db.close();
    });
  });
});

router.post('/deleteData', function(req, res, next) {
  var id = req.body.id;

  MongoClient.connect(uriTestDb, function(err, db){
    assert.equal(null, err);
    db.collection('bbrr').deleteOne({"_id": objectId(id)}, function(err, result){
      assert.equal(null, err);
      res.json('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
