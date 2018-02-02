var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desciption: {
        type: String
    },
    users: {
        type: Array
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
