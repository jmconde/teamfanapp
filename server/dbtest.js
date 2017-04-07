"use strict";

var connFactory = require("./db/connectionFactory.js");

var models = require("./db/models");
var pais = models.pais;
var ciudad = models.ciudad;
var estadio = models.estadio;
var equipo = models.equipo;

// pais.findOne().then((pais) => {
//     console.log(pais.get({ plain: true }));

// estadio.findAll().then((ciudades) => {
//     ciudades.forEach(ciudad => {
//         console.log(ciudad.get({ plain: true }));
//     });

//     conn.close();
//     });
// User.findAll({ include: [ Task ] }).then(function(users) {
//   console.log(JSON.stringify(users))
pais.findOne({
    //    include: [{ model: ciudad, include: [pais] }]
    where: {
        codigo_iso: "CO"
    },

    include: [{ model: ciudad, where: { codigo_dane: {
            $like: "47%"
        } } }]
}).then((r) => {
    // console.log(ciudad.paisId);
    console.log(JSON.stringify(r));
    // console.log(ciudad.get({ plain: true }));
});
