'use strict'

var express = require('express');
var DetLeccionControl = require('../Controllers/DetalleLeccion');
var api = express.Router();
var md_auth = require('../middleware/auth');
var multipart = require('connect-multiparty');

api.get('/getDetLeccion/:id',md_auth.ensureAuth,DetLeccionControl.getDetLeccion);
api.get('/getDetLecciones/:page?',md_auth.ensureAuth,DetLeccionControl.getDetLecciones);
api.post('/saveLeccion',md_auth.ensureAuth,DetLeccionControl.saveDetLeccion);
api.put('/updateLeccion/:id',md_auth.ensureAuth,DetLeccionControl.updateDetLeccion);
api.delete('/deleteLeccion/:id',md_auth.ensureAuth,DetLeccionControl.deleteDetLeccion);

module.exports = api;