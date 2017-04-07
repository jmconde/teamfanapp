"use strict";

var estadiosData = require("../data/estadios.json");

module.exports = {
    up: queryInterface => queryInterface.bulkInsert("estadios", estadiosData),

    down: queryInterface => queryInterface.bulkDelete("estadios")
        .then(() => queryInterface.sequelize.query("ALTER TABLE  `estadios` AUTO_INCREMENT = 1;"))
};
