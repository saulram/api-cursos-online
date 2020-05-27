'use strict'

var express = require('express');
var LeccionControl = require('../Controllers/Leccion');
var api = express.Router();
var md_auth = require('../middleware/auth');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/curso'});

api.get('/getLeccion/:id',md_auth.ensureAuth,LeccionControl.getLeccion);
api.get('/getLecciones/:page?',md_auth.ensureAuth,LeccionControl.getLecciones);
api.post('/saveLeccion',md_auth.ensureAuth,LeccionControl.saveLeccion);
api.put('/updateLeccion/:id',md_auth.ensureAuth,LeccionControl.updateLeccion);
api.delete('/deleteLeccion/:id',md_auth.ensureAuth,LeccionControl.deleteLeccion);
api.post('/uploadImagenLeccion/:id',[md_auth.ensureAuth,md_upload],LeccionControl.uploadImage);
api.get('/getImagenLeccion/:imageFile',LeccionControl.getImagen);

module.exports = api;