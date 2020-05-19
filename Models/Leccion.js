'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeccionSchema = Schema({
    name: String,
    description : String,
    image:  String,
    // curso: {type: schema.ObjectId,ref:'Curso'}
});

module.exports = mongoose.model('Leccion',LeccionSchema);