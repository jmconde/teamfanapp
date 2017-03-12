"use strict";

var data = require("./data.json");
/*
 {
    torneoId: 2,
    jornada: 4,
    fecha: "Wed May 17 2017 20:45:00 GMT-0500 (Eastern Standard Time)",
    localId: 28,
    visitanteId: 26,
    golesLocal: null,
    golesVisitante: null,
    amarillasLocal: null,
    amarillasVisitante: null
}
*/

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

module.exports = function (server) {
    server.get('/version', getVersion);
    server.get('/actualidad', actualidad);
}
