"use strict";

import React from "react";
import { HashRouter, Link } from "react-router-dom";
import config from "../../common/config.js";
import Filter from "./Filter.jsx";

export default class EstadioList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.search.substring(1));
        var params = this.props.location.search.substring(1).split(",");
        console.log(params);

        this.state = {
            estadios: [],
            estadiosToShow: [],
            queryPais: params[0],
            queryCiudad: params[1]
        };

        this.setEstadios = this.setEstadios.bind(this);
        this.filterHandler = this.filterHandler.bind(this);

    }

    setEstadios(estadios) {
        this.setState({ estadios, estadiosToShow: estadios });
    }

    filterHandler(estadios) {
        this.setState({ estadiosToShow: estadios });
    }

    componentDidMount() {
        if (this.state.queryCiudad) {
            $.getJSON(`${config.api}/paises/${this.state.queryPais}/ciudades/${this.state.queryCiudad}/estadios`, this.setEstadios);
        } else {
            $.getJSON(`${config.api}/paises/${this.state.queryPais}/estadios`, this.setEstadios);
        }
    }

    render() {
        var estadios = this.state.estadiosToShow.map((estadio, i) => {
            return (
                <tr key={i}>
                    <td>{estadio.id}</td>
                    <td>{estadio.nombre}</td>
                    <td>{estadio.ciudad.nombre}</td>
                    <td>{estadio.ciudad.pais.nombre}</td>
                    <td>
                        <Link to={{
                            pathname: "/estadios/edit",
                            search: `?${estadio.id}`
                        }}>Edit</Link>
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Lista de Estadios</h3>
                    <Filter source = {this.state.estadios} min="0" field="nombre" handler = { this.filterHandler } />
                    <HashRouter>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Ciudad</th>
                                    <th>País</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody>
                                { estadios }
                            </tbody>
                        </table>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
