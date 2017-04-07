"use strict";

module.exports = function (sequelize, DataTypes) {
    var estadio = sequelize.define("estadio", {
        nombre: DataTypes.STRING
    }, {
            tableName: "estadios",
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    estadio.belongsTo(models.ciudad, {
                        foreingKey: "codigo_dane",
                        onDelete: "CASCADE"
                    });
                }
            }
        });
    return estadio;
};
