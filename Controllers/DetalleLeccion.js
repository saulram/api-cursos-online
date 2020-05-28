'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
var Curso = require('../Models/Curso');
var Leccion = require('../Models/Leccion');
var DetalleLeccion = require('../Models/DetalleLeccion');

function getDetLeccion (req, res){
    var detleccionId = req.params.id;

    DetalleLeccion.findById(detleccionId).populate({path : 'leccion'}).exec((err, detleccion) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!detleccion){
                res.status(404).send({message:'No existe el Detalle de la Leccion'});
            }else{
                res.status(500).send({Detalle: detleccion});
            }
        }
    });
}
function getDetLecciones (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    DetalleLeccion.find().sort().paginate(paginas,itemsPorPagina,function(err,detlecciones,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!detlecciones){
                res.status(404).send({message:'No existen Detalles de la Leccion'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    Detalles: detlecciones
                });
            }
        }
    });

}
function saveDetLeccion(req, res){
    var detleccion = new DetalleLeccion();

    var params = req.body;

    detleccion.contenido = params.contenido;
    detleccion.video = params.video;
    detleccion.leccion = params.leccion;

    detleccion.save((err, detleccionStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!detleccionStored){
                res.status(404).send({message: 'No se pudo guardar el Detalle de la Leccion'});
            }else{
                res.status(200).send({detalle: detleccionStored});
            }
        }
    });
}
function updateDetLeccion (req, res){
    var detleccionId = req.params.id;
    var update = req.body;

    DetalleLeccion.findByIdAndUpdate(detleccionId, update, (err, detleccionUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!detleccionUpdated){
                res.status(404).send({message: 'No se pudo actualizar el Detalle de la Leccion'});
            }else{
                res.status(200).send({Detalle: detleccionUpdated});
            }
        }
    });
}
function deleteDetLeccion (req, res){
    var detleccionId = req.params.id;

    DetalleLeccion.findByIdAndRemove(detleccionId, (err, detleccionRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!detleccionRemoved){
                res.status(404).send({message: 'No se pudo elimanar el Detalle de la Leccion'});
            }else{
                res.status(200).send({Detalle: detleccionRemoved});
            }
        }
    });
}
module.exports = {
    getDetLeccion,
    getDetLecciones,
    saveDetLeccion,
    updateDetLeccion,
    deleteDetLeccion
}