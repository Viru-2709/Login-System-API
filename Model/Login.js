const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    firstname : String,
    lastname : String,
    username : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
});

const LOGIN = mongoose.model('Login', LoginSchema);

module.exports = LOGIN