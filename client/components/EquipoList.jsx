"use strict";

import React from "react";
import { HashRouter, Link } from "react-router-dom";
import config from "../../common/config.js";
import Filter from "./Filter.jsx";

export default class EstadioList extends React.Component {
    constructor(props) {
        super(props);
        var params = this.props.location.search.substring(1).split(",");
        this.state = {
            equipos: [],
            equiposToShow: [],
            queryPais: params[0],
            queryCiudad: params[1]
        };

        this.setEquipos = this.setEquipos.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    setEquipos(equipos) {
        this.setState({ equipos, equiposToShow: equipos });
    }

    filterHandler(equipos) {
        this.setState({ equiposToShow: equipos });
    }

    componentDidMount() {
        if (this.state.queryCiudad) {
            $.getJSON(`${config.api}/paises/${this.state.queryPais}/ciudades/${this.state.queryCiudad}/equipos`, this.setEquipos);
        } else {
            $.getJSON(`${config.api}/paises/${this.state.queryPais}/equipos`, this.setEquipos);
        }
    }

    render() {
        var equipos = this.state.equiposToShow.map((equipo, i) => {
            return (
                <tr key={i}>
                    <td>{equipo.id}</td>
                    <td>{equipo.nombre}</td>
                    <td>{equipo.ciudad.nombre}</td>
                    <td>{equipo.ciudad.pais.nombre}</td>
                    <td>{equipo.imagen}</td>
                    <td>{equipo.nombre_corto}</td>
                    <td>
                        <Link to={{
                            pathname: "/equipos/edit",
                            search: `?${equipo.id}`
                        }}>Edit</Link>
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Lista de Estadios</h3>
                    <Filter source = {this.state.equipos} min="0" field="nombre" handler = { this.filterHandler } />
                    <HashRouter>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Ciudad</th>
                                    <th>País</th>
                                    <th>Imagen</th>
                                    <th>Nombre Corto</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody>
                                { equipos }
                            </tbody>
                        </table>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
