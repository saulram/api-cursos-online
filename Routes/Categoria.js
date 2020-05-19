'use strict'

var express = require('express');
var CategoriaControl = require('../Controllers/Categoria');
var api = express.Router();
var md_auth = require('../middleware/auth');

api.get('/getCategoria/:id',md_auth.ensureAuth,CategoriaControl.getCategoria);
api.get('/getCategorias/:page?',md_auth.ensureAuth,CategoriaControl.getCategorias);
api.post('/saveCategoria',md_auth.ensureAuth,CategoriaControl.saveCategoria);
api.put('/updateCategoria/:id',md_auth.ensureAuth,CategoriaControl.updateCategoria);
api.delete('/deleteCategoria/:id',md_auth.ensureAuth,CategoriaControl.deleteCategoria);

module.exports = api;
