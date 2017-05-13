"use strict";

import React from "react";
import { HashRouter, Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render () {
        return (
            <HashRouter>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Home</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="">
                                    <Link to="/paises">Paises</Link>
                                </li>
                                <li>
                                    <Link to="/ciudades">Ciudades</Link>
                                </li>
                                <li>
                                    <Link to="/estadios">Estadios</Link>
                                </li>
                                <li>
                                    <Link to="/equipos">Equipos</Link>
                                </li>
                                <li>
                                    <Link to="/config">Configuración</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </HashRouter>
        )
    }
}
