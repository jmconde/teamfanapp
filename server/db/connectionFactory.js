"use strict";
var orm = require("orm");

var pais = require("../model/pais.js");
// var PaisEntity = require("../entity/pais.js");
// var CiudadEntity = require("../entity/ciudad.js");
// var EquipoEntity = require("../entity/equipo.js");
// var EstadioEntity = require("../entity/estadio.js");

var connection;

module.exports = function (callback) {
    if (connection) return callback(null, connection);

        orm.connect({
            protocol : "mysql",
            query    : { pool: true },
            host     : "xintana.co",
            port: 3306,
            database : "unionapp",
            user     : "unionapp_user",
            password : "Maw274IGNPZjYcMM"
        }, function(err, db) {
        
        if (err) return console.error('Connection error: ' + err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);

        pais(db);

        callback(null, connection);
        
    });
//    return  typeorm.createConnection({
//         driver: {
//             type: "mysql",
//             host: "xintana.co",
//             port: 3306,
//             username: "unionapp_user",
//             password: "Maw274IGNPZjYcMM",
//             database: "unionapp"
//         },
//         entitySchemas: [
//             PaisEntity,
//             CiudadEntity,
//             // EquipoEntity,
//             EstadioEntity
//         ],
//         autoSchemaSync: true
//     })
};
