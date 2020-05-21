'use strict'

var express = require('express');
var UserControl = require('../Controllers/Usuario');
var auth = require('../middleware/auth');

var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuario'});

api.post('/saveUsuario',UserControl.saveUsuario);
api.post('/loginUsuario',UserControl.loginUsuario);
api.put('/updateUsuario/:id',auth.ensureAuth,UserControl.updateUser);
api.post('/uploadImagen/:id',[auth.ensureAuth,md_upload],UserControl.uploadImage);
api.get('/getImagen/:imageFile',UserControl.getImagen);

module.exports = api;