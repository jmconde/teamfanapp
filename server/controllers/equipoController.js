"use strict";

var Ciudad = require("../db/models").ciudad;
var Pais = require("../db/models").pais;
var Equipo = require("../db/models").equipo;
var Estadio = require("../db/models").estadio;
var logger = require("winston");

const includeCiudadPaisEstadio = [{ model: Ciudad, include: [Pais] }, {model: Estadio, include: [Ciudad]}];

module.exports = {
    create(req, res) {
        return Equipo.create({
            id: req.body.id,
            nombre: req.body.nombre,
            ciudadId: req.body.ciudadId,
            estadioId: req.body.estadioId,
            imagen: req.body.imagen,
            nombre_corto: req.body.nombre_corto
        })
        .then(equipo => res.status(201).send(equipo))
        .catch(err => res.status(400).send(err));
    },

    update(req, res) {
        console.log(req.body.nombre);
        return Equipo.update({
            nombre: req.body.nombre,
            ciudadId: req.body.ciudadId,
            estadioId: req.body.estadioId,
            imagen: req.body.imagen,
            nombre_corto: req.body.nombre_corto
        }, {
            where: {
                id: req.params.equipoId
            }
        })
        .then(updated => res.status(201).send(updated))
        .catch(err => res.status(400).send(err));
    },

    byId(req, res) {
        logger.log("info", "byId: " + req.params.equipoId);
        return Equipo.findById(req.params.equipoId, {
            include: includeCiudadPaisEstadio
        })
        .then(equipo => res.status(201).send(equipo))
        .catch(err => res.status(400).send(err));
    },

    all(req, res) {
        return Equipo.findAll({
            order: "nombre ASC",
            include: includeCiudadPaisEstadio
        })
        .then(equipos => res.status(201).send(equipos))
        .catch(err => res.status(400).send(err));
    },

    allByCiudad(req, res) {
        logger.log("allByCiudad", req.params.ciudadId)
        return Equipo.findAll({
            order: "nombre ASC",
            include: includeCiudadPaisEstadio,
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
            }, Estadio]
        })
        .then(equipos => res.status(201).send(equipos))
        .catch(err => res.status(400).send(err));
    }
};
