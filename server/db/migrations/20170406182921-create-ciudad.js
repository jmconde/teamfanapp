"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("ciudades", {
            codigo_dane: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
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
            },

            // Foreing keys
            paisId: {
                type: Sequelize.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "paises",
                    key: "codigo_iso",
                    as: "paisId"
                }
            }
        });
    },

    down: function (queryInterface) {
        return queryInterface.dropTable("ciudades");
    }
};
