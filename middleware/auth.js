'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Disolutionsmx-CursoOnline';

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la autorizacion'});
       
       }
    var token= req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
           return res.status(401).send({message:'El Token ha expiro'});
           }
        

    }catch(ex){
        console.log();
        return res.status(403).send({message:'El Token no es valido'});
    }
    req.usuario = payload;
    next();
};
