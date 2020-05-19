'use strict'
var fs = require('fs');
var path = require('path');

var Categoria = require('../Models/Categoria');
// var Curso = require('../Models/Curso');
// var Leccion = require('../Models/Leccion');
// var DetalleLeccion = require('../Models/DetalleLeccion');
// var Pregunta = require('../Models/Pregunta');
// var Test = require('../Models/Test');

function getCategoria (req, res){
    res.status(200).send({message: 'Funciona api getcategoria'});
}
function saveCategoria (req, res){
    var categoria = new Categoria();

    var params = req.body;
    categoria.name = params.name;
    categoria.description = params.description;

    categoria.save((err, categoriaStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la Categoria'});
        }else{
            if(!categoriaStored){
                res.status(404).send({message: 'No se pudo guardar la Categoria'})
            }else{
                res.status(200).send({message: categoriaStored});
                console.log(params);
            }
        }
    });
}

module.exports = {
    getCategoria,
    saveCategoria
};