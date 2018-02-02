var Group = require('../models/group');

exports.getGroups = function(req, res, next){

    Group.find(function(err, groups) {

        if (err){
            res.send(err);
        }
 
        res.json(groups);

    });

}

exports.createGroup = function(req, res, next){

    Group.create({
        title : req.body.title
    }, function(err, group) {

        if (err){
            res.send(err);
        }

        Group.find(function(err, groups) {

            if (err){
                res.send(err);
            }

            res.json(groups);

        });

    });

}

exports.deleteGroup = function(req, res, next){

    Group.remove({
        _id : req.params.group_id
    }, function(err, Group) {
        res.json(Group);
    });

}
