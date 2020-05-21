'use strict'

var expres = require ('express');
// var bodyparser = require ('body-parser');

var app = expres();

//Cargar rutas
var user_route = require  ('./Routes/Usuario');
var categoria_route = require ('./Routes/Categoria');
var curso_route = require ('./Routes/Curso');

app.use(expres.json());
app.use(expres.urlencoded({extended:false}));


//Configuerar cabeceras http


//Ruta base
app.use('/api',user_route);
app.use('/api',categoria_route);
app.use('/api',curso_route);

module.exports = app;



