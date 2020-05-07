'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var LeccionSchema = schema({
    name: String,
    description : String,
    image:  String,
    curso: {type: schema.ObjectId,ref:'Curso'}
})

module.exports = mongoose.model('Leccion',LeccionSchema);