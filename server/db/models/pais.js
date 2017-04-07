"use strict";

module.exports = function (sequelize, DataTypes) {
    var pais = sequelize.define("pais", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: "codigo_iso"
        },
        nombre: DataTypes.STRING
    }, {
            tableName: "paises",
            name: {
                plural: "paises",
                singular: "pais"
            },
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    pais.hasMany(models.ciudad, {
                        foreignKey: "paisId"
                    });
                }
            }
        });
    return pais;
};
