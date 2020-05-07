'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var TestSchema = schema({
    name: String,
    description : String,
    type: String,
    curso: {type: schema.ObjectId,ref:'Curso'}
})

module.exports = mongoose.model('Test',TestSchema);