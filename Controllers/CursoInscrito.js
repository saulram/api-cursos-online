'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Usuario = require('../Models/Usuario');
var Curso = require('../Models/Curso');
var CursoIns = require ('../Models/CursoInscrito');
function getCursoIns (req, res){
    var cursoInsId = req.params.id;

    CursoIns.findById(cursoInsId).populate({path : 'usuario'}).exec((err, cursoIns) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!cursoIns){
                res.status(404).send({message:'No existe el curso'});
            }else{
                res.status(500).send({curso: cursoIns});
            }
        }
    });
}
// function getCursos (req, res){
//     if(req.params.page){
//         var paginas = req.params.page;
//     }else{
//         var paginas = 1;
//     }
//     var itemsPorPagina = 5;

//     Curso.find().sort('name').paginate(paginas,itemsPorPagina,function(err,cursos,total){
//         if(err){
//             res.status(500).send({message:'Error en la peticion'});
//         }else{
//             if(!cursos){
//                 res.status(404).send({message:'No existen Cursos'});
//             }else{
//                 return res.status(500).send({
//                     totalItems: total,
//                     cursos: cursos
//                 });
//             }
//         }
//     });

// }
// function saveCurso(req, res){
//     var curso = new Curso();

//     var params = req.body;

//     curso.name = params.name;
//     curso.image = params.image;
//     curso.description = params.description;
//     curso.visible = params.visible;
//     curso.categoria = params.categoria;

//     curso.save((err, cursoStored) => {
//         if(err){
//             res.status(500).send({message: 'Error en la peticion'});
//         }else{
//             if(!cursoStored){
//                 res.status(404).send({message: 'No se pudo guardar el Curso'});
//             }else{
//                 res.status(200).send({curso: cursoStored});
//             }
//         }
//     });
// }
// function updateCurso (req, res){
//     var cursoId = req.params.id;
//     var update = req.body;

//     Curso.findByIdAndUpdate(cursoId, update, (err, cursoUpdated) =>{
//         if(err){
//             res.status(500).send({message: 'Error en la peticion'});
//         }else{
//             if(!cursoUpdated){
//                 res.status(404).send({message: 'No se pudo actualizar el Curso'});
//             }else{
//                 res.status(200).send({curso: cursoUpdated});
//             }
//         }
//     });
// }
// function deleteCurso (req, res){
//     var cursoId = req.params.id;

//     Curso.findByIdAndRemove(cursoId, (err, cursoRemoved) =>{
//         if(err){
//             res.status(500).send({message: 'Error en la peticion'});
//         }else{
//             if(!cursoRemoved){
//                 res.status(404).send({message: 'No se pudo elimanar el Curso'});
//             }else{
//                 Leccion.find({curso: cursoRemoved._id}).remove((err,leccionRemoved)=>{
//                     if(err){
//                         res.status(500).send({message: 'Error en la peticion'});
//                     }else{
//                         if(!leccionRemoved){
//                             res.status(404).send({message: 'No se pudo elimanar la Leccion'});
//                         }else{
//                             DetalleLeccion.find({curso: LeccionRemoved._id}).remove((err,detleccionRemoved)=>{
//                                 if(err){
//                                     res.status(500).send({message: 'Error en la peticion'});
//                                 }else{
//                                     if(!detleccionRemoved){
//                                         res.status(404).send({message: 'No se pudo elimanar el Detalle del Curso'});
//                                     }else{
//                                         res.status(200).send({curso: cursoRemoved});
//                                     }
//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         }
//     });
// }


module.exports = {
    getCurso
    // getCursos,
    // saveCurso,
    // updateCurso,
    // deleteCurso
}