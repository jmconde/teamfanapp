"use strict";

module.exports = function (sequelize, DataTypes) {
    var ciudad = sequelize.define("ciudad", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            field: "codigo_dane"
        },
        nombre: DataTypes.STRING
    }, {
            tableName: "ciudades",
            name: {
                plural: "ciudades",
                singular: "ciudad"
            },
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    ciudad.belongsTo(models.pais, {
                        foreingKey: "codigo_iso",
                        onDelete: "CASCADE"
                    });

                    ciudad.hasMany(models.estadio, {
                        foreignKey: "ciudadId"
                    });
                    ciudad.hasMany(models.equipo, {
                        foreignKey: "ciudadId"
                    });
                }
            }
        });
    return ciudad;
};
