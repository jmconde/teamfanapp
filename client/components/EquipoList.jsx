"use strict";

import React from "react";
import config from '../../common/config.js';

export default class EstadioList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.search.substring(1));
        var params = this.props.location.search.substring(1).split(",");
        console.log(params);
        this.state = {
            estadios: []
        }
    }

    componentDidMount() {
        $.getJSON(`${config.api}/paises/CO/ciudades/47001/estadios`)
    }

    render() {
        return (
            <h4>Equipos</h4>
        );
    }
}
