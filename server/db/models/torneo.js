"use strict";

module.exports = function (sequelize, DataTypes) {
    var torneo = sequelize.define("torneo", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fechaFin: {
            type: DataTypes.DATE
        }
    }, {
            classMethods: {
                associate: function (models) {
                    torneo.belongsTo(models.pais, {
                        foreingKey: "codigo_iso",
                        onDelete: "CASCADE"
                    });
                }
            }
        });
    return torneo;
};
