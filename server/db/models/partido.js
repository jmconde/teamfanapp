"use strict";
module.exports = function (sequelize, DataTypes) {
    var partido = sequelize.define("partido", {
        fecha: DataTypes.DATE,
        jornada: DataTypes.INTEGER,
        golesLocal: DataTypes.INTEGER,
        golesVisita: DataTypes.INTEGER
    }, {
            tableName: "partidos",
            name: {
                plural: "partidos",
                singular: "partido"
            },
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });
    return partido;
};
