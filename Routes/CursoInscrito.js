'use strict'

var express = require('express');
var CursoInsControl = require('../Controllers/CursoInscrito');
var api = express.Router();
var md_auth = require('../middleware/auth');

api.get('/getCursoIns/:id',md_auth.ensureAuth,CursoInsControl.getCursoIns);
// api.get('/getCursosIns/:page?',md_auth.ensureAuth,CursoInsControl.getCursosIns);
// api.post('/saveCursoIns',md_auth.ensureAuth,CursoInsControl.saveCursoIns);
// api.put('/updateCursoIns/:id',md_auth.ensureAuth,CursoInsControl.updateCursoIns);
// api.delete('/deleteCursoIns/:id',md_auth.ensureAuth,CursoInsControl.deleteCursoIns);

module.exports = api;


