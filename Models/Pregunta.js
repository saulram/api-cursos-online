'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreguntaSchema = Schema({
    options: String,
    correct:  String,
    // test: {type: schema.ObjectId,ref:'Test'}
});

module.exports = mongoose.model('Pregunta',PreguntaSchema);