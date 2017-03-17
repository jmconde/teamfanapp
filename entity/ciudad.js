const Ciudad = require("../model/ciudad");

const CiudadsSchema = {
    target: Ciudad,
    columns: {
        codigo_dane: {
            primary: true,
            type: "string"
        },
        nombre: {
            type: "string"
        }
    }
};

module.exports = CiudadsSchema;
