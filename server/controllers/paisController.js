"use strict";

var Pais = require("../db/models").pais;

module.exports = {
    create(req, res) {
        return Pais.create({
            id: req.body.id,
            nombre: req.body.nombre
        })
        .then(pais => res.status(201).send(pais))
        .catch(err => res.status(400).send(err));
    },

    update(req, res) {
        console.log(req.body.nombre);
        return Pais.update({
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.paisId
            }
        })
        .then(updated => res.status(201).send(updated))
        .catch(err => res.status(400).send(err));
    },

    all(req, res) {
        return Pais.all()
        .then(paises => res.status(201).send(paises))
        .catch(err => res.status(400).send(err));
    },

    find(req, res) {
        return Pais.find({
            where: {
                id: req.params.paisId
            }
        })
        .then(pais => res.status(201).send(pais))
        .catch(err => res.status(400).send(err));
    },

    delete(req, res) {
        console.log(req.params);
        return Pais.destroy({
            where: {
                id: req.params.paisId
            }
        })
        .then(count => res.status(201).send({ count }))
        .catch(err => res.status(400).send(err));
    }
};
