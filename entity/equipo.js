const Equipo = require("../model/equipo.js");
const Estadio = require("../entity/estadio.js");

const EquipoSchema = {
    target: Equipo,
    columns: {
        id: {
            type: "int",
            primary: true
        },
        imagen: {
            type: "string"
        },
        nombre_corto: {
            type: "string"
        },
        id_estadio: {
            type: "int"
        }
    },
    relations: {
        estadio: {
            target: Estadio,
            type: "many-to-one",
            joinTable: true,
            // cascadeInsert: true
        }
    }
};

module.exports = EquipoSchema;