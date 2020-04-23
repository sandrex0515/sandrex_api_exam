const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname:{
        type: String,
        require: true
    },
    mname:{
        type: String,

    },
    lname:{
        type: String,
        require: true
    },
    gender:{
        type: String,
    },
    bdate:{
        type: String,
    },
    email:{
        type: String,
        require: true
    },
    mnumber:{
        type: String,

    },
    presentAdd:{
        type: String,

    },
    pass:{
        type: String,
        require: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);
