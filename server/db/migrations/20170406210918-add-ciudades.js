"use strict";

var ciudadesData = require("../data/ciudades.json");

module.exports = {
    up: queryInterface => queryInterface.bulkInsert("ciudades", ciudadesData),

    down: queryInterface => queryInterface.bulkDelete("ciudades")
        .then(() => queryInterface.sequelize.query("ALTER TABLE  `ciudades` AUTO_INCREMENT = 1;"))
};
