'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var DetLeccionSchema = schema({
    contenido: String,
    video:  String,
    leccion: {type: schema.ObjectId,ref:'Leccion'}
})

module.exports = mongoose.model('DetLeccion',DetLeccionSchema);