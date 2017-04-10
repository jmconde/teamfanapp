"use strict";

import React from "react";
import { HashRouter, Link } from "react-router-dom";
import Filter from "./Filter.jsx";

export default class CiudadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pais: this.props.location.search.substring(1) || "CO",
            ciudades: [],
            ciudadesToShow: []
        };

        this.filterHandler = this.filterHandler.bind(this);
    }

    filterHandler(ciudades) {
        this.setState({
            ciudadesToShow: ciudades
        })
    }

    componentDidMount() {
        var paisId = this.state.pais;
        $.getJSON(`http://localhost:5051/api/paises/${paisId}`, pais => {
            this.setState({ paisNombre: pais.nombre });
        });
         $.getJSON(`http://localhost:5051/api/paises/${paisId}/ciudades`, ciudades => {
            this.setState({ 
                ciudades,
                ciudadesToShow: ciudades 
            });
        });
    }

    render() {
        var ciudades = this.state.ciudadesToShow.map(ciudad => {
            return (
                <tr key={ciudad.id}>
                    <td>{ciudad.id}</td>
                    <td>{ciudad.nombre}</td>
                    <td>{ciudad.pais.nombre}</td>
                    <td>
                        <Link to={{
                            pathname: "/ciudades/edit",
                            search: `?${ciudad.id}`
                        }}>Edit</Link>&nbsp;
                        <Link to={{
                                pathname: `/estadios`,
                                search: `?${ciudad.pais.id},${ciudad.id}`
                            }}>Estadios
                        </Link>
                    </td>
                </tr>
            )
        });

        return(
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Lista de Ciudades de {this.state.paisNombre}</h3>
                    <Filter source = {this.state.ciudades} min="0" field="nombre" handler = { this.filterHandler } />
                    <HashRouter>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>País</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody>
                                { ciudades }
                            </tbody>
                        </table>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
