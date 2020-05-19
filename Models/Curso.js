'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    name: String,
    image:  String,
    description : String,
    visible: Boolean,
    categoria: {type: Schema.ObjectId, ref:'Categoria'}
});

module.exports = mongoose.model('Curso',CursoSchema);