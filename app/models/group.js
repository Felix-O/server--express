var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({

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

module.exports = mongoose.model('Group', GroupSchema);
