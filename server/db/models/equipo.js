"use strict";
module.exports = function (sequelize, DataTypes) {
    var equipo = sequelize.define("equipo", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_corto: DataTypes.STRING
    }, {
            tableName: "equipos",
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    equipo.belongsTo(models.ciudad, {
                        foreignKey: "ciudadId"
                    });
                    equipo.belongsTo(models.estadio, {
                        foreignKey: "estadioId"
                    });
                }
            }
        });

    return equipo;
};
