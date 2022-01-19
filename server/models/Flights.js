const mongoose = require('mongoose');
const AirlineSchema = new mongoose.Schema({
    
    FlightNumber: {
        type: String,
        required: true,
    },

    From: {
        type: String,
        required: true,
    },

    To: {
        type: String,
        required: true,
    },

    FlightDate: {
        type: String,
        required: true,
    },

    Cabin: {
        type: String,
        required: true,
        // enum: ['First', 'Business', 'Economy'],
        // default: 'Economy'
    },

    SeatsAvailableOnFlight: {
        type: Number,
        required: true,
    },

    Price: {
        type: Number,
        required: true,
    },

    DepartureTime: {
        type: String,
        required: true,
    },

    ArrivalTime: {
        type: String,
        required: true,
    },
    Duration: {
        type: Number,
        required: true,
    },
    SeatsAvailable: [{
        type: String,
        required: false
    }]

});

const AirlineModel = mongoose.model('flights', AirlineSchema);
module.exports = AirlineModel;