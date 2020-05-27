'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetLeccionSchema = Schema({
    contenido: String,
    video:  String,
    leccion: {type: Schema.ObjectId,ref:'Leccion'}
});

module.exports = mongoose.model('DetLeccion',DetLeccionSchema);