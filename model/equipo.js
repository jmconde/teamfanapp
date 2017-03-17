// {"id": 1, "nombre":"Unión Magdalena", "imagen": "ic_union_magdalena", "nombre_corto": "xxx", "estadio": 1},
class Equipo {
    constructor(id, nombre, imagen, nombre_corto, id_estadio) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.nombre_corto = nombre_corto;
        this.id_estadio = id_estadio;
    }
}

module.exports = Equipo;