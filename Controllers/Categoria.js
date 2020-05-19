'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
// var Curso = require('../Models/Curso');
// var Leccion = require('../Models/Leccion');
// var DetalleLeccion = require('../Models/DetalleLeccion');
// var Pregunta = require('../Models/Pregunta');
// var Test = require('../Models/Test');

function getCategoria (req, res){
    var categoriaId = req.params.id;

    Categoria.findById(categoriaId, (err, categoria) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!categoria){
                res.status(404).send({message:'No existe la categoria'});
            }else{
                res.status(500).send({categoria: categoria});
            }
        }
    });
}
function getCategorias (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Categoria.find().sort('name').paginate(paginas,itemsPorPagina,function(err,categorias,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!categorias){
                res.status(404).send({message:'No existen categorias'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    categorias:categorias
                });
            }
        }
    });

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
                res.status(404).send({message: 'No se pudo guardar la Categoria'});
            }else{
                res.status(200).send({categoria: categoriaStored});
                console.log(params);
            }
        }
    });
}
function updateCategoria (req, res){
    var categoriaId = req.params.id;
    var update = req.body;

    Categoria.findByIdAndUpdate(categoriaId, update, (err, categoriaUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!categoriaUpdated){
                res.status(404).send({message: 'No se pudo actualizar la Categoria'});
            }else{
                res.status(200).send({categoria: categoriaUpdated});
            }
        }
    });
}
function deleteCategoria (req, res){
    var categoriaId = req.params.id;

    Categoria.findByIdAndRemove(categoriaId, (err, categoriaRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!categoriaRemoved){
                res.status(404).send({message: 'No se pudo elimanar la Categoria'});
            }else{
                res.status(200).send({message: 'Bien elimando'});
                // Curso.find({categria: categoriaRemoved._id}).remove((err,cursoRemoved)=>{
                //     if(err){
                //         res.status(500).send({message: 'Error en la peticion'});
                //     }else{
                //         if(!cursoRemoved){
                //             res.status(404).send({message: 'No se pudo elimanar el Curso'});
                //         }else{
                //             // Validacion de los hijos del modelo Curso.js
                //         }
                //     }
                // });
            }
        }
    });
}

module.exports = {
    getCategoria,
    getCategorias,
    saveCategoria,
    updateCategoria,
    deleteCategoria
};