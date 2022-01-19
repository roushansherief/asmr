const mongoose = require('mongoose');

const ExistingUsers = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    HomeAddress: {
        type: String,
        required: true
    },
    CountryCode: {
        type: String,
        required: true
    },
    TelephoneNumber: {
        type: String,
        required: true
    },
    CountryCode2: {
        type: String,
        required: false
    },
    TelephoneNumber2: {
        type: String,
        required: false
    },
    Email: {
        type: String,
        required: true
    },
    PassportNumber: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        default: "user",
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('existingusers', ExistingUsers);
module.exports = UserModel;