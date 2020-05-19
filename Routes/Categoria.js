'use strict'

var express = require('express');
var CategoriaControl = require('../Controllers/Categoria');
var api = express.Router();
var md_auth = require('../middleware/auth');

api.get('/getCategoria',md_auth.ensureAuth,CategoriaControl.getCategoria);
api.post('/saveCategoria',md_auth.ensureAuth,CategoriaControl.saveCategoria);

module.exports = api;
