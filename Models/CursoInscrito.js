'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoInsSchema = Schema({
    usuario: {type: Schema.ObjectId,ref:'Usuario'},
    curso: {type: Schema.ObjectId,ref:'Curso'}
})

module.exports = mongoose.model('CursoIns',CursoInsSchema);