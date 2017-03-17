const Ciudad = require("../entity/ciudad.js");
const Estadio = require("../model/estadio.js");

const EstadioSchema = {
    target: Estadio,
    columns: {
        id: {
            type: "int",
            primary: true
        },
        nombre: {
            type: "string"
        },
        ciudad: {
            type: "string"
        }
    },
    relations: {
        ciudad: {
            target: "Ciudad",
            type: "many-to-one",
            // joinColumn: "codigo_dane",
            joinTable: false
        }
    }
};

module.exports = EstadioSchema;