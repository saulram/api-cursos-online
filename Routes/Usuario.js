'use strict'

var express = require('express');
var UserControl = require('../Controllers/Usuario');
var auth = require('../middleware/auth');

var api = express.Router();

api.get('/controlador', auth.ensureAuth ,UserControl.pruebas);
api.post('/saveUsuario',UserControl.saveUsuario);
api.post('/loginUsuario',UserControl.loginUsuario);
api.put('/updateUsuario/:id',auth.ensureAuth,UserControl.updateUser);

module.exports = api;