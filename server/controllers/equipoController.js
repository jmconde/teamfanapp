"use strict";

var Ciudad = require("../db/models").ciudad;
var Pais = require("../db/models").pais;
var Equipo = require("../db/models").equipo;
var logger = require("winston");

module.exports = {
    allByCiudad(req, res) {
        logger.log("allByCiudad", req.params.ciudadId)
        return Equipo.findAll({
            order: "nombre ASC",
            include: [Ciudad],
            where: {
                ciudadId:  req.params.ciudadId
            }
        })
        .then(equipos => res.status(201).send(equipos))
        .catch(err => res.status(400).send(err));
    },

    allByPais(req, res) {
        logger.log("allByPais", req.params.paisId);

        return Equipo.findAll({
            order: "nombre ASC",
            include: [{
                model: Ciudad,
                where: {
                    paisId: req.params.paisId
                },
                include: [Pais]
            }]
        })
        .then(equipos => res.status(201).send(equipos))
        .catch(err => res.status(400).send(err));
    }
};
