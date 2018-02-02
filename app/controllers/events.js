var Ev = require('../models/event');

exports.getEvents = function(req, res, next){

    Ev.find(function(err, events) {

        if (err){
            res.send(err);
        }

        res.json(events);

    });

}

exports.createEvent = function(req, res, next){

    Ev.create({
        title : req.body.title
    }, function(err, ev) {

        if (err){
            res.send(err);
        }

        Ev.find(function(err, events) {

            if (err){
                res.send(err);
            }

            res.json(events);

        });

    });

}

exports.deleteEvent = function(req, res, next){

    Ev.remove({
        _id : req.params.event_id
    }, function(err, ev) {
        res.json(ev);
    });

}
