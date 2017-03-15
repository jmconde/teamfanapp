const Pais = require("../model/pais");

const PaisSchema = {
    target: Pais,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "string"
        },
        codigo_iso: {
            type: "string"
        }
    }
};

module.exports = PaisSchema;
