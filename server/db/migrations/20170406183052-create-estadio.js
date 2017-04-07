"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("estadios", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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

            // foreign key
            ciudadId: {
                type: Sequelize.STRING,
                onDelete: "CASCADE",
                references: {
                    model: "ciudades",
                    key: "codigo_dane",
                    as: "ciudadId"
                }
            }
        });
    },

    down: function (queryInterface) {
        return queryInterface.dropTable("estadios");
    }
};
