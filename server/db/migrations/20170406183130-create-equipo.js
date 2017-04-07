"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("equipos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                type: Sequelize.STRING
            },
            imagen: {
                type: Sequelize.STRING
            },
            nombre_corto: {
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
            ciudadId: {
                type: Sequelize.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "ciudades",
                    key: "codigo_dane",
                    as: "ciudadId"
                }
            },
            estadioId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "estadios",
                    key: "id",
                    as: "estadioId"
                }
            }
        });
    },

    down: function (queryInterface) {
        return queryInterface.dropTable("equipos");
    }
};
