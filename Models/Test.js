'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = Schema({
    name: String,
    description : String,
    type: String,
    curso: {type: Schema.ObjectId,ref:'Curso'}
})

module.exports = mongoose.model('Test',TestSchema);