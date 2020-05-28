'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
var Curso = require('../Models/Curso');
var Test = require('../Models/Test');
var Pregunta = require('../Models/Pregunta');

function getPregunta (req, res){
    var preguntaId = req.params.id;

    Pregunta.findById(preguntaId).populate({path : 'test'}).exec((err, pregunta) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!pregunta){
                res.status(404).send({message:'No existe la Pregunta'});
            }else{
                res.status(500).send({pregunta: pregunta});
            }
        }
    });
}
function getPreguntas (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Pregunta.find().sort().paginate(paginas,itemsPorPagina,function(err,preguntas,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!preguntas){
                res.status(404).send({message:'No existen Preguntas'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    preguntas: preguntas
                });
            }
        }
    });

}
function savePregunta(req, res){
    var pregunta = new Pregunta();

    var params = req.body;

    pregunta.options = params.options;
    pregunta.correct = params.correct;
    pregunta.test = params.test;

    pregunta.save((err, preguntaStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!preguntaStored){
                res.status(404).send({message: 'No se pudo guardar la Pregunta'});
            }else{
                res.status(200).send({pregunta: preguntaStored});
            }
        }
    });
}
function updatePregunta (req, res){
    var preguntaId = req.params.id;
    var update = req.body;

    Pregunta.findByIdAndUpdate(preguntaId, update, (err, preguntaUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!preguntaUpdated){
                res.status(404).send({message: 'No se pudo actualizar la Pregunta'});
            }else{
                res.status(200).send({pregunta: preguntaUpdated});
            }
        }
    });
}
function deletePregunta (req, res){
    var preguntaId = req.params.id;

    Pregunta.findByIdAndRemove(preguntaId, (err, preguntaRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!preguntaRemoved){
                res.status(404).send({message: 'No se pudo elimanar la Pregunta'});
            }else{
                res.status(200).send({pregunta: preguntaRemoved});
            }
        }
    });
}
module.exports = {
    getPregunta,
    getPreguntas,
    savePregunta,
    updatePregunta,
    deletePregunta
}