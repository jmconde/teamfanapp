"use strict";

import React from "react";
import Q from "q";

export default class SelectorCiudad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paisEnabled: false,
            ciudadEnabled: false,
            pais: props.pais
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    getPaises() {
        return $.getJSON(`http://localhost:5051/api/paises`);
    }

    getCiudades(pais) {
        return $.getJSON(`http://localhost:5051/api/paises/${pais}/ciudades`);
    }

    componentDidMount() {
        var promises = [this.getPaises()];
        if (this.state.pais) {
            promises.push(this.getCiudades(this.state.pais));
        }

        Q.all(promises).then((paises, ciudades) => {
            this.setState({
                paises,
                paisEnabled: true
            });

            if (ciudades) {
                this.setState({
                    ciudades,
                    ciudadEnabled: true
                });
            }
        });
    }

    handleSelectChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "pais") {
            // TODO:
            console.log("Buscar ciudades pais");
        } else if (name === "ciudad") {
            this.setState({ ciudad: value });
        }
    }
}
