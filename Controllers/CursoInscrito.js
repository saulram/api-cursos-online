'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Usuario = require('../Models/Usuario');
var Curso = require('../Models/Curso');
var CursoIns = require ('../Models/CursoInscrito');

function getCursosIns (req, res){
    var usuarioId = req.params.id;
    CursoIns.find({usuario: usuarioId}).populate('curso').exec(function(err,cursosIns){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!cursosIns){
                res.status(404).send({message:'No existen Cursos'});
            }else{
                return res.status(500).send({
                    cursos: cursosIns
                });
            }
        }
    });
}
function saveCursoIns(req, res){
    var cursoIns = new CursoIns();

    var params = req.body;

    cursoIns.usuario = params.usuario;
    cursoIns.curso = params.curso;

    cursoIns.save((err, cursoInsStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!cursoInsStored){
                res.status(404).send({message: 'No se pudo guardar el Curso'});
            }else{
                res.status(200).send({curso: cursoInsStored});
            }
        }
    });
}
function deleteCursoIns (req, res){
    var usuarioId = req.params.idusuario;
    var cursoId = req.params.idcurso;
    CursoIns.findOneAndRemove(({usuario:usuarioId,curso:cursoId}), (err, cursoRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!cursoRemoved){
                res.status(404).send({message: 'No se pudo elimanar el Curso'});
            }else{
            }
        }
    });
}


module.exports = {
    getCursosIns,
    saveCursoIns,
    deleteCursoIns
}