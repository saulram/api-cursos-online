'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Disolutionsmx-CursoOnline';

exports.createToken = function(usuario,){
    var payload = {
        sub: usuario._id,
        name: usuario.name,
        surname: usuario.surname,
        description : usuario.description,
        profiles: usuario.profiles,
        role: usuario.role,
        email: usuario.email,
        // password: String,
        status: usuario.status,
        avatar: usuario.avatar,
        iat: moment().unix(),
        ext:moment().add(30,'days').unix
    };

    return jwt.encode(payload,secret);

};