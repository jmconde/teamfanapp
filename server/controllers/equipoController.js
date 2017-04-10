"use strict";

var Ciudad = require("../db/models").ciudad;
var Equipo = require("../db/models").equipo;
var logger = require("winston");

module.exports = {
    allByCiudad(req, res) {
        logger.log("allByCiudad", req.params.ciudadId)
        return Equipo.findAll({
            include: [Ciudad],
            where: {
                ciudadId:  req.params.ciudadId
            }
        })
        .then(equipos => res.status(201).send(equipos))
        .catch(err => res.status(400).send(err));
    }
};
