"use strict";

var sequelize = require("sequelize");
var Pais = require("../db/models").pais;
var Ciudad = require("../db/models").ciudad;
var Estadio = require("../db/models").estadio;
var logger = require("winston");

const includeCiudadPais = [{ model: Ciudad, include: [Pais] }];

module.exports = {
    create(req, res) {
        return Estadio.create({
            id: req.body.id,
            nombre: req.body.nombre,
            ciudadId: req.body.ciudadId
        })
        .then(estadio => res.status(201).send(estadio))
        .catch(err => res.status(400).send(err));
    },

    update(req, res) {
        console.log(req.body.nombre);
        return Estadio.update({
            nombre: req.body.nombre,
            ciudadId: req.body.ciudadId
        }, {
            where: {
                id: req.params.estadioId
            }
        })
        .then(updated => res.status(201).send(updated))
        .catch(err => res.status(400).send(err));
    },

    byId(req, res) {
        logger.log("info", "byId: " + req.params.estadioId);
        return Estadio.findById(req.params.estadioId, {
            include: includeCiudadPais
        })
        .then(estadio => res.status(201).send(estadio))
        .catch(err => res.status(400).send(err));
    },

    all(req, res) {
        return Estadio.findAll({
            order: "nombre ASC",
            include: includeCiudadPais
        })
        .then(estadios => res.status(201).send(estadios))
        .catch(err => res.status(400).send(err));
    },

    allByCiudad(req, res) {
        logger.log("info", "allByCiudad: " + req.params.ciudadId);
        return Estadio.findAll({
            order: "nombre ASC",
            include: includeCiudadPais,
            where: {
                ciudadId:  req.params.ciudadId
            }
        })
        .then(estadios => res.status(201).send(estadios))
        .catch(err => res.status(400).send(err));
    },

    allByPais(req, res) {
        logger.log("allByPais", req.params.paisId)
        return Estadio.findAll({
            order: "nombre ASC",
            include: [{
                model: Ciudad,
                where: { paisId: req.params.paisId },
                include: [Pais]
            }]
        })
        .then(estadios => res.status(201).send(estadios))
        .catch(err => res.status(400).send(err));
    },

    ciudades(req, res) {
        return Estadio.findAll({
            distinct: true,
            attributes: [sequelize.literal("DISTINCT `ciudadId`"), "ciudadId"]
        })
        .then(estadios => res.status(201).send(estadios.map(ciudad => ciudad.ciudadId)))
        .catch(err => res.status(400).send(err));
    }

};
