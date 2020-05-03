// restaurantModel.js
var mongoose = require('mongoose');
// Setup schema
var restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String, //approved,pending,rejected
        required: true
    },
    emailStatus: {
        type: String, //verified,not verified
        required: true
    },
    isActive:
    {
        type: Boolean, 
        default: true
    },
    isDeleted:
    {
        type: Boolean, 
        default: false
    },
    createdDTM: {
        type: Date,
        default: Date.now
    },
    modifiedDTM: {
        type: Date,
        default: Date.now
    }
});


// Export Restaurant model
var Restaurant = module.exports = mongoose.model('restaurant', restaurantSchema);
module.exports.get = function (callback, limit) {
    Restaurant.find(callback).limit(limit);
}