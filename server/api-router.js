"use strict";

var router = require("express").Router();

var connFactory = require("./db/connectionFactory.js");
var data = require("./data.json");

var pais = require("./model/pais.js");

function actualidad(req, res, next) {
    res.json(data);
    next();
}

function getVersion(req, res, next) {
    res.json({
        version: 1
    })
    next();
}

function getCiudades(req, res, next) {
    connFactory(conn => {
        var repo = conn.getRepository("Ciudad");
        repo.find().then(ciudades => {
            res.json(ciudades);
            conn.close();
        });
    });
}

function getEstadios(req, res, next) {
    connFactory().then(conn => {
        var repo = conn.getRepository("Estadio");
        repo.find().then(result => {
            res.json(result);
            conn.close();
        })
    });
}

function getEquipos(req, res, next) {
    connFactory().then(conn => {
        var repo = conn.getRepository("Equipo");
        repo.find().then(result => {
            res.json(result);
            conn.close();
        })
    });
}

function getPaises(req, res, next) {
    // connFactory().then(conn => {
    //     var repo = conn.getRepository("Pais");
    //     repo.find().then(result => {
    //         res.json(result);
    //         conn.close();
    //     })
    // });

    connFactory((err, conn) => {
        console.log("conn", conn);
        conn.models.pais.find(function (err, result) {
            console.log("====>",err, result);
        });
    });
}

router.get('/version', getVersion);
router.get('/actualidad', actualidad);

router.get('/ciudades', getCiudades);
router.get('/equipos', getEquipos);
router.get('/estadios', getEstadios);
router.get('/paises', getPaises);

module.exports = router;
