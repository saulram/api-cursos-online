'use strict'

var express = require('express');
var TestControl = require('../Controllers/Test');
var api = express.Router();
var md_auth = require('../middleware/auth');
var multipart = require('connect-multiparty');

api.get('/getTest/:id',md_auth.ensureAuth,TestControl.getTest);
api.get('/getTests/:page?',md_auth.ensureAuth,TestControl.getTests);
api.post('/saveTest',md_auth.ensureAuth,TestControl.saveTest);
api.put('/updateTest/:id',md_auth.ensureAuth,TestControl.updateTest);
api.delete('/deleteTest/:id',md_auth.ensureAuth,TestControl.deleteTest);

module.exports = api;