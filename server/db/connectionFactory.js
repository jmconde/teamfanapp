"use strict";
// var orm = require("orm");
var Sequelize = require("sequelize");

var models = require("./models");
var pais = models.pais;
var ciudad = models.ciudad;

module.exports = function (sync, forceSync) {


    var db = new Sequelize("unionapp", "unionapp_user", "Maw274IGNPZjYcMM", {
        host: "xintana.co",
        dialect: "mariadb",

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    if (sync) db.sync({ force: forceSync });

    pais(db);
    ciudad(db);

    return db;
};

/*module.exports = function (callback) {
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

    });*/

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
// };
