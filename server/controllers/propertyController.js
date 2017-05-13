"use strict";

var Property = require("../db/models").property;

module.exports = {
    create(req, res) {
        return Property.create({
            key: req.body.key,
            value: req.body.value
        })
        .then(property => res.status(201).send(property))
        .catch(err => res.status(400).send(err));
    },

    update(req, res) {
        return Property.update({
            key: req.body.key,
            value: req.body.value
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(updated => res.status(201).send(updated))
        .catch(err => res.status(400).send(err));
    },

    delete(req, res) {
        return Property.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(count => res.status(201).send({ count }))
        .catch(err => res.status(400).send(err));
    },

    all(req, res) {
        return Property.findAll({
            order: "`key` ASC"
        })
        .then(properties => res.status(201).send(properties))
        .catch(err => res.status(400).send(err));
    },

    byKey(req, res) {
        return Property.findOne({
            where: {
                key: req.params.key
            }
        })
    }
};
