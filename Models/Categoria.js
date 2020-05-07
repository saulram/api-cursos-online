'use strict'

var mongoose = require('mongoose');
var schema = mongoose.schema;

var CategoriaSchema = schema({
    name: String,
    description : String
})

module.exports = mongoose.model('Categoria',CategoriaSchema);