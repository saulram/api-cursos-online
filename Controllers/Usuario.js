'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../Models/Usuario');
var jwt = require('../Services/Jwt');

function getUuarios (req, res){
    if(req.params.page){
        var paginas = req.params.page;
    }else{
        var paginas = 1;
    }
    var itemsPorPagina = 5;

    Usuario.find().sort('name').paginate(paginas,itemsPorPagina,function(err,usuarios,total){
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!usuarios){
                res.status(404).send({message:'No existen Usuarios'});
            }else{
                return res.status(500).send({
                    totalItems: total,
                    usuarios: usuarios
                });
            }
        }
    });

}
function saveUsuario(req, res){

        var usuario = new Usuario();
        var params = req.body;

        usuario.name = params.name;
        usuario.surname = params.surname;
        usuario.description  = params.description
        usuario.profiles = params.profiles
        usuario.role = params.role
        usuario.email = params.email
        usuario.status = params.status
        usuario.avatar = 'null'

        if (params.password){
            bcrypt.hash(params.password, null, null,function(err,hash){
                usuario.password = hash
                if(usuario.name != null && usuario.surname != null && usuario.email != null){
                    // Guarda el usuario
                    usuario.save((err,userStored)=>{
                        if(err){
                            res.status(500).send({message:'Error en la peticion'});
                        }else{
                            if(!userStored){
                                res.status(404).send({message:'No se ha registrado el usuario'});
                            }else{
                                res.status(200).send({usuario: userStored});
                                // res.status(200).send(usuario.password);
                            }

                        }
                    });

                }else{
                    res.status(200).send({message:'Rellena todos los campos'});
                }
            });
        }else{
            res.status(200).send({message:'Introduce tu contraseña'});
        }
}
function loginUsuario(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    Usuario.findOne({email: email.toLowerCase()},(err,usuario)=>{
        if (err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if (!usuario){
                res.status(404).send({message: 'No existe el usuario'});
            }else{
                // Comprobar contraseña
                bcrypt.compare(password,usuario.password,function(err,check){
                    if(check){
                        //Devuelve datos del usuario logueado
                        if(params.gethash){
                            res.status(200).send({usuario});
                            //Devuelve el token de jwt
                            res.status(200).send({
                                token: jwt.createToken(usuario)
                            });
                        }else{
                            res.status(200).send({usuario});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no pudo loguearse'});

                    }

                })

            }
        }
    })

}
function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    Usuario.findByIdAndUpdate(userId,update,(err,userUpdated) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!userUpdated){
                res.status(200).send({message: 'No se actulizo el usuario'});
            }else{
                res.status(200).send({usuario: userUpdated});
            }
        }

    });

}
function uploadImage(req, res){
    var userId = req.params.id;
    var fileName = 'No subido..';
    
    if(req.files){
        var filePath = req.files.avatar.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];

        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' ||fileExt == 'gif'  ){
            Usuario.findByIdAndUpdate(userId,{avatar:fileName},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error en la peticion'});
                }else{
                    if(!userUpdated){
                        res.status(200).send({message: 'No se actulizo el usuario'});
                    }else{
                        res.status(200).send({usuario: userUpdated});
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
    var pathFile = './uploads/usuario/'+imageFile;
    fs.exists(pathFile,function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    })
}
module.exports = {
    getUuarios,
    saveUsuario,
    loginUsuario,
    updateUser,
    uploadImage, 
    getImagen
};