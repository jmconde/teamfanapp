"use strict";

const paisesData = require("../data/paises.json");

module.exports = {
    up: queryInterface => queryInterface.bulkInsert("paises", paisesData),

    down: queryInterface => queryInterface.bulkDelete("paises")
        .then(() => queryInterface.sequelize.query("ALTER TABLE  `paises` AUTO_INCREMENT = 1;"))
};
