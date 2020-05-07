'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var CursoSchema = schema({
    name: String,
    image:  String,
    description : String,
    visible: Boolean,
    categoria: {type: schema.ObjectId,ref:'Categoria'}
})

module.exports = mongoose.model('Curso',CursoSchema);