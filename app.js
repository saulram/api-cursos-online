'use strict'

var expres = require ('express');
// var bodyparser = require ('body-parser');

var app = expres();

//Cargar rutas
var user_route = require  ('./Routes/Usuario');

app.use(expres.json());
app.use(expres.urlencoded({extended:false}));

// app.use(bodyparser.json({limit:1024*1024*20, type:'application/json'}));
// app.use(bodyparser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' }));

//Configuerar cabeceras http


//Ruta base
app.use('/api',user_route);

module.exports = app;


