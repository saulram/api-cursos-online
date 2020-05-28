'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
var Curso = require('../Models/Curso');
var Leccion = require('../Models/Leccion');
var DetalleLeccion = require('../Models/DetalleLeccion');

function getLeccion (req, res){
    var lecionId = req.params.id;

    Leccion.findById(leccionId).populate({path : 'curso'}).exec((err, leccion) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!leccion){
                res.status(404).send({message:'No existe la Leccion'});
            }else{
                res.status(500).send({leccion: leccion});
            }
        }
    });
}
function getLecciones (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Leccion.find().sort('name').paginate(paginas,itemsPorPagina,function(err,lecciones,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!lecciones){
                res.status(404).send({message:'No existen Lecciones'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    lecciones: lecciones
                });
            }
        }
    });

}
function saveLeccion(req, res){
    var leccion = new Leccion();

    var params = req.body;
    leccion.name = params.name;
    leccion.description = params.description;
    leccion.image = params.image;
    leccion.curso = params.curso;

    leccion.save((err, leccionStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!leccionStored){
                res.status(404).send({message: 'No se pudo guardar la Leccion'});
            }else{
                res.status(200).send({leccion: leccionStored});
            }
        }
    });
}
function updateLeccion (req, res){
    var leccionId = req.params.id;
    var update = req.body;

    Leccion.findByIdAndUpdate(leccionId, update, (err, leccionUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!leccionUpdated){
                res.status(404).send({message: 'No se pudo actualizar la Leccion'});
            }else{
                res.status(200).send({leccion: leccionUpdated});
            }
        }
    });
}
function deleteLeccion (req, res){
    var leccionId = req.params.id;

    Leccion.findByIdAndRemove(leccionId, (err, leccionRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!leccionRemoved){
                res.status(404).send({message: 'No se pudo elimanar la Leccion'});
            }else{
                DetalleLeccion.find({curso: LeccionRemoved._id}).remove((err,detleccionRemoved)=>{
                    if(err){
                        res.status(500).send({message: 'Error en la peticion'});
                    }else{
                        if(!detleccionRemoved){
                            res.status(404).send({message: 'No se pudo elimanar la Leccion'});
                        }else{
                            res.status(200).send({leccion: leccionRemoved});
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req, res){
    var leccionId = req.params.id;
    var fileName = 'No subido..';
    
    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' ||fileExt == 'gif'  ){
            Leccion.findByIdAndUpdate(leccionId,{image:fileName},(err,leccionUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error en la peticion'});
                }else{
                    if(!leccionUpdated){
                        res.status(200).send({message: 'No se actulizo la Leccion'});
                    }else{
                        res.status(200).send({leccion: leccionUpdated});
                    }
                }
            });
        }else{
            res.status(200).send({message: 'Extension del archivo no valida'});
        }
    }else{
        res.status(200).send({message: 'No se encotro la imagen'});
    }
}
function getImagen (req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/leccion/'+imageFile;
    fs.exists(pathFile,function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    })
}

module.exports = {
    getLeccion,
    getLecciones,
    saveLeccion,
    updateLeccion,
    deleteLeccion,
    uploadImage,
    getImagen
}