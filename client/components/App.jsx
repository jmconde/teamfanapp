import React from "react";
import {HashRouter, Route } from 'react-router-dom';

import PaisForm from "./PaisForm.jsx";
import PaisList from "./PaisList.jsx";
import CiudadForm from "./CiudadForm.jsx";
import CiudadList from "./CiudadList.jsx";
import EstadioList from "./EstadioList.jsx";
import EstadioEdit from "./EstadioEdit.jsx";
import EquipoList from "./EquipoList.jsx";
import TorneoEdit from "./TorneoEdit.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";

export default class App extends React.Component {
    render () { // <PaisForm pais="CO" update={true} />
        return (
            <div>
                <Header />
                <Nav />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/paises" component={PaisList} />
                        <Route exact path="/paise/edits" component={PaisForm} />
                        <Route exact path="/ciudades" component={CiudadList} />
                        <Route exact path="/estadios" component={EstadioList} />
                        <Route exact path="/estadios/edit" component={EstadioEdit} />
                        <Route exact path="/equipos" component={EquipoList} />
                        <Route exact path="/torneo/edit" component={TorneoEdit} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
