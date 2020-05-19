'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    name: String,
    description : String
});

module.exports = mongoose.model('Categoria',CategoriaSchema);