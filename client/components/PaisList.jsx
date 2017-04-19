import React from "react";
import { HashRouter, Link } from "react-router-dom";
import Filter from './Filter.jsx';

export default class PaisList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paises: [],
            paisesToShow: []
        };

        this.filterHandler = this.filterHandler.bind(this);
    }

    componentDidMount() {
        $.getJSON("http://localhost:5051/api/paises", paises => {
            this.setState({
                paises,
                paisesToShow: paises
             });
        });
    }

    filterHandler(paises) {
        this.setState({
            paisesToShow: paises
        });
    }

    render() {
        var paises = this.state.paisesToShow.map(pais => {
            return (
                <tr key={pais.id}>
                    <td>{pais.id}</td>
                    <td>{pais.nombre}</td>
                    <td>
                        <Link to={{
                            pathname: "/paises/edit",
                            search: `?${pais.id}`
                        }}>Edit</Link>
                        &nbsp;
                         <Link to={{
                            pathname: "/ciudades",
                            search: `?${pais.id}`
                        }}>Ciudades</Link>
                        &nbsp;
                         <Link to={{
                            pathname: "/estadios",
                            search: `?${pais.id}`
                        }}>Estadios</Link>
                        &nbsp;
                         <Link to={{
                            pathname: "/equipos",
                            search: `?${pais.id}`
                        }}>Equipos</Link>
                    </td>
                </tr>
            )
        });

        return(
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Lista de Paises</h3>
                    <Filter source = {this.state.paises} min="0" field="nombre" handler = { this.filterHandler } />
                    <HashRouter>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody>
                                { paises }
                            </tbody>
                        </table>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
