'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
var Curso = require('../Models/Curso');
// var Leccion = require('../Models/Leccion');
// var DetalleLeccion = require('../Models/DetalleLeccion');
// var Pregunta = require('../Models/Pregunta');
// var Test = require('../Models/Test');

function getCurso (req, res){
    var cursoId = req.params.id;

    Curso.findById(cursoId).populate({path : 'categoria'}).exec((err, curso) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!curso){
                res.status(404).send({message:'No existe el curso'});
            }else{
                res.status(500).send({curso: curso});
            }
        }
    });
}
function getCursos (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Curso.find().sort('name').paginate(paginas,itemsPorPagina,function(err,cursos,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!cursos){
                res.status(404).send({message:'No existen Cursos'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    cursos: cursos
                });
            }
        }
    });

}
function saveCurso(req, res){
    var curso = new Curso();

    var params = req.body;

    curso.name = params.name;
    curso.image = params.image;
    curso.description = params.description;
    curso.visible = params.visible;
    curso.categoria = params.categoria;

    curso.save((err, cursoStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!cursoStored){
                res.status(404).send({message: 'No se pudo guardar el Curso'});
            }else{
                res.status(200).send({curso: cursoStored});
            }
        }
    });
}
function updateCurso (req, res){
    var cursoId = req.params.id;
    var update = req.body;

    Curso.findByIdAndUpdate(cursoId, update, (err, cursoUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!cursoUpdated){
                res.status(404).send({message: 'No se pudo actualizar el Curso'});
            }else{
                res.status(200).send({curso: cursoUpdated});
            }
        }
    });
}
function deleteCurso (req, res){
    var cursoId = req.params.id;

    Curso.findByIdAndRemove(cursoId, (err, cursoRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!cursoRemoved){
                res.status(404).send({message: 'No se pudo elimanar el Curso'});
            }else{
                Leccion.find({curso: cursoRemoved._id}).remove((err,leccionRemoved)=>{
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
                                        res.status(404).send({message: 'No se pudo elimanar el Detalle del Curso'});
                                    }else{
                                        res.status(200).send({curso: cursoRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
function uploadImage(req, res){
    var cursoId = req.params.id;
    var fileName = 'No subido..';
    
    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' ||fileExt == 'gif'  ){
            Curso.findByIdAndUpdate(cursoId,{image:fileName},(err,cursoUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error en la peticion'});
                }else{
                    if(!userUpdated){
                        res.status(200).send({message: 'No se actulizo el Curso'});
                    }else{
                        res.status(200).send({curso: cursoUpdated});
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
    var pathFile = './uploads/curso/'+imageFile;
    fs.exists(pathFile,function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    })
}

module.exports = {
    getCurso,
    getCursos,
    saveCurso,
    updateCurso,
    deleteCurso,
    uploadImage,
    getImagen
}