"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("paises", {
            codigo_iso: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            nombre: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                default: Sequelize.fn("NOW")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                default: Sequelize.fn("NOW")
            }
        });
    },

    down: function (queryInterface) {
        return queryInterface.dropTable("paises");
    }
};
