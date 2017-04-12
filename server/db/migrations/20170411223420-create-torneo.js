"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("torneos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fechaInicio: {
                type: Sequelize.DATE,
                allowNull: false
            },
            fechaFin: {
                type: Sequelize.DATE
            },
            paisId: {
                type: Sequelize.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "paises",
                    key: "codigo_iso",
                    as: "paisId"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: function (queryInterface) {
        return queryInterface.dropTable("torneos");
    }
};
