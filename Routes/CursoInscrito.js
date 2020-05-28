'use strict'

var express = require('express');
var CursoInsControl = require('../Controllers/CursoInscrito');
var api = express.Router();
var md_auth = require('../middleware/auth');

api.get('/getCursosIns/:id',md_auth.ensureAuth,CursoInsControl.getCursosIns);
api.post('/saveCursoIns',md_auth.ensureAuth,CursoInsControl.saveCursoIns);
api.delete('/deleteCursoIns/:idusuario/:idcurso',md_auth.ensureAuth,CursoInsControl.deleteCursoIns);


module.exports = api;


