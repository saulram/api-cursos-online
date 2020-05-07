'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var CursoInsSchema = schema({
    usuario: {type: schema.ObjectId,ref:'Usuario'},
    curso: {type: schema.ObjectId,ref:'Curso'}
})

module.exports = mongoose.model('CursoIns',CursoInsSchema);