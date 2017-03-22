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
            type: "one-to-many",
            joinColumn: "codigo_dane",
            joinTable: false
        }
    }
};

module.exports = EstadioSchema;