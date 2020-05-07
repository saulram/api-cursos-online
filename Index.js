'use strict'

var mongoose = require ('mongoose');
var app = require ('./app');
var port = process.env.port || 3969;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CursoOnline',(err,res)=>{
    if (err){
        throw err;
    }else{
        console.log("La base esta correcta y funcionando");
        
        app.listen(port,function(){
            console.log("Servidor funcionando "+port);
        });
    }
});