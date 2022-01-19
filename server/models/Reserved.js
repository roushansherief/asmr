const mongoose = require('mongoose');
const ReservedSchema = new mongoose.Schema({
    
    FlightNumber: {
        type: Number,
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

    NumberOfTickets: {
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
    UserID: {
        type: String,
        required: true,
    },
    ReservedSeats: [{
        type: String,
        required: false
    }],
    NotReservedSeats: [{
        type: String,
        required: false
    }]

});

const ReservedModel = mongoose.model('reserved', ReservedSchema);
module.exports = ReservedModel;