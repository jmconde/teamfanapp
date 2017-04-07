"use strict";

var equiposData = require("../data/equipos.json");

module.exports = {
    up: queryInterface => queryInterface.bulkInsert("equipos", equiposData),

    down: queryInterface => queryInterface.bulkDelete("equipos")
        .then(() => queryInterface.sequelize.query("ALTER TABLE  `equipos` AUTO_INCREMENT = 1;"))
};
