'use strict'

var expres = require ('express');
// var bodyparser = require ('body-parser');

var app = expres();

//Cargar rutas
var user_route = require  ('./Routes/Usuario');
var categoria_route = require ('./Routes/Categoria');
var curso_route = require ('./Routes/Curso');
var test_route = require ('./Routes/Test');
var pregunta_route = require ('./Routes/Pregunta');
var leccion_route = require ('./Routes/Leccion');
var DetLeccion_route = require ('./Routes/DetalleLeccion');

app.use(expres.json());
app.use(expres.urlencoded({extended:false}));


//Configuerar cabeceras http


//Ruta base
app.use('/api',user_route);
app.use('/api',categoria_route);
app.use('/api',curso_route);
app.use('/api',test_route);
app.use('/api',pregunta_route);
app.use('/api',leccion_route);
app.use('/api',DetLeccion_route);

module.exports = app;



