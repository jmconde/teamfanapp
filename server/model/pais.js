module.exports = function (db) {
    var Pais = db.define("pais", {
        codigo_iso: { type: "text" },
        nombre: { type: "text" }        
    })
};

/*var sequelize = require("sequelize")
class Pais {
    constructor (id, nombre, codigo_iso) {
        this.id = id;
        this.nombre = nombre;
        this.codigo_iso = codigo_iso;
    }
}

module.exports = Pais;*/