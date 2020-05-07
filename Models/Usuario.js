'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UsuarioSchema = schema({
    name: String,
    surname:  String,
    description : String,
    profiles: String,
    role: String,
    email: String,
    password: String,
    status: String,
    avatar: String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);