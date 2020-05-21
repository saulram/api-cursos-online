'use strict'

var express = require('express');
var CursoControl = require('../Controllers/Curso');
var api = express.Router();
var md_auth = require('../middleware/auth');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/curso'});

api.get('/getCurso/:id',md_auth.ensureAuth,CursoControl.getCurso);
api.get('/getCursos/:page?',md_auth.ensureAuth,CursoControl.getCursos);
api.post('/saveCurso',md_auth.ensureAuth,CursoControl.saveCurso);
api.put('/updateCurso/:id',md_auth.ensureAuth,CursoControl.updateCurso);
api.delete('/deleteCurso/:id',md_auth.ensureAuth,CursoControl.deleteCurso);
api.post('/uploadImagenCurso/:id',[md_auth.ensureAuth,md_upload],CursoControl.uploadImage);
api.get('/getImagenCurso/:imageFile',CursoControl.getImagen);

module.exports = api;


