'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var PreguntaSchema = schema({
    options: String,
    correct:  String,
    test: {type: schema.ObjectId,ref:'Test'}
})

module.exports = mongoose.model('Pregunta',PreguntaSchema);