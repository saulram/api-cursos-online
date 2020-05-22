'use strict'
var fs = require('fs');
var path = require('path');
var pagina = require('mongoose-pagination');

var Categoria = require('../Models/Categoria');
var Curso = require('../Models/Curso');
var Test = require('../Models/Test');
var Pregunta = require('../Models/Pregunta');

function getTest (req, res){
    var testId = req.params.id;

    Test.findById(testId).populate({path : 'curso'}).exec((err, test) =>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!test){
                res.status(404).send({message:'No existe el Test'});
            }else{
                res.status(500).send({test: test});
            }
        }
    });
}
function getTests (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Test.find().sort('name').paginate(paginas,itemsPorPagina,function(err,tests,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!tests){
                res.status(404).send({message:'No existen Tests'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    tests: tests
                });
            }
        }
    });

}
function saveTest(req, res){
    var test = new Test();

    var params = req.body;
    
    test.name = params.name;
    test.description = params.description;
    test.type = params.type;
    test.curso = params.curso;

    test.save((err, testStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!testStored){
                res.status(404).send({message: 'No se pudo guardar el Test'});
            }else{
                res.status(200).send({test: testStored});
            }
        }
    });
}
function updateTest (req, res){
    var testId = req.params.id;
    var update = req.body;

    Test.findByIdAndUpdate(testId, update, (err, testUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!testUpdated){
                res.status(404).send({message: 'No se pudo actualizar el Test'});
            }else{
                res.status(200).send({test: testUpdated});
            }
        }
    });
}
function deleteTest (req, res){
    var testId = req.params.id;

    Test.findByIdAndRemove(testId, (err, testRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!testRemoved){
                res.status(404).send({message: 'No se pudo elimanar el Test'});
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
    getTest,
    getTests,
    saveTest,
    updateTest,
    deleteTest
}