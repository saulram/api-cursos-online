'use strict'

var express = require('express');
var PreguntaControl = require('../Controllers/Pregunta');
var api = express.Router();
var md_auth = require('../middleware/auth');
var multipart = require('connect-multiparty');

api.get('/getPregunta/:id',md_auth.ensureAuth,PreguntaControl.getPregunta);
api.get('/getPreguntas/:page?',md_auth.ensureAuth,PreguntaControl.getPreguntas);
api.post('/savePregunta',md_auth.ensureAuth,PreguntaControl.savePregunta);
api.put('/updatePregunta/:id',md_auth.ensureAuth,PreguntaControl.updatePregunta);
api.delete('/deletePregunta/:id',md_auth.ensureAuth,PreguntaControl.deletePregunta);

module.exports = api;