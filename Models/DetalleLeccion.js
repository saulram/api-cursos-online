'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetLeccionSchema = Schema({
    contenido: String,
    video:  String,
    // leccion: {type: schema.ObjectId,ref:'Leccion'}
});

module.exports = mongoose.model('DetLeccion',DetLeccionSchema);