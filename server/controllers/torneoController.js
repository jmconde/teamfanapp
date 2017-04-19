"use strict";

var Torneo = require("../db/models").torneo;

module.exports = {
    create(req, res) {
        return Torneo.create({
            nombre: req.body.nombre,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin,
            paisId: req.body.paisId
        })
        .then(torneo => res.status(201).send(torneo))
        .catch(err => res.status(400).send(err));
    },

    all(req, res) {
        return Torneo.all({
            order: "nombre ASC"
        })
        .then(torneos => res.status(201).send(torneos))
        .catch(err => res.status(400).send(err));
    }
};
