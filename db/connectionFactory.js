"use strict";
var typeorm = require("typeorm");
var PaisEntity = require("../entity/pais.js");
var CiudadEntity = require("../entity/ciudad.js");
var EquipoEntity = require("../entity/equipo.js");
var EstadioEntity = require("../entity/estadio.js");

module.exports = function () {
   return  typeorm.createConnection({
        driver: {
            type: "mysql",
            host: "xintana.co",
            port: 3306,
            username: "unionapp_user",
            password: "Maw274IGNPZjYcMM",
            database: "unionapp"
        },
        entitySchemas: [
            PaisEntity,
            CiudadEntity,
            // EquipoEntity,
            EstadioEntity
        ],
        autoSchemaSync: true
    })
};
