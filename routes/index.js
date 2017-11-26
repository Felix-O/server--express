var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var uriTestDb = "mongodb://foje:F0j3500.@cluster0-shard-00-00-3xrpm.mongodb.net:27017,cluster0-shard-00-01-3xrpm.mongodb.net:27017,cluster0-shard-00-02-3xrpm.mongodb.net:27017/data_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Server' });
});

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
      console.log('Item recieved');
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
      console.log('Item updated');
      db.close();
    });
  });
});

router.delete('/deleteData', function(req, res, next) {
  var id = req.body.id;

  MongoClient.connect(uriTestDb, function(err, db){
    assert.equal(null, err);
    db.collection('bbrr').deleteOne({"_id": objectId(id)}, function(err, result){
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
