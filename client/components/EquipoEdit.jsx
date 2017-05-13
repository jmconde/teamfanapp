import React from "react";
import FormBase from "./FormBase.jsx";
import Q from "q";

export default class PaisForm extends FormBase {
    constructor(props) {
        super(props);
        console.log(this.state.id)
        this.state.paises = [];
        this.state.ciudades = [];
        this.state.estadios = [];
    }

    componentDidMount() {
        if (this.state.update) {
            $.getJSON(`http://localhost:5051/api/equipos/${this.state.id}`)
                .then(equipo => {
                    this.setState({
                        source: Object.assign({}, equipo),
                        nombre: equipo.nombre,
                        id: equipo.id,
                        ciudad: equipo.ciudad.id,
                        pais: equipo.ciudad.pais.id,
                        estadio: equipo.estadio.id,
                        imagen: equipo.imagen,
                        nombre_corto: equipo.nombre_corto
                    });
                    return $.getJSON(`http://localhost:5051/api/paises`);
                })
                .then(paises => {
                    this.setState({
                        paises
                    });
                    return $.getJSON(`http://localhost:5051/api/paises/${this.state.pais}/ciudades`);
                })

                .then(ciudades => {
                    this.setState({
                        ciudades
                    });
                    return $.getJSON(`http://localhost:5051/api/paises/${this.state.pais}/estadios`);
                })

                .then(estadios => {
                    this.setState({
                        estadios,
                        disabled: false
                    });
                });
        }
    }

    onSelectChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const state = this.state[name];

        if (value === state) return;

        if (name === "pais") {
            this.setState({
                disabled: true
            });

            $.getJSON(`http://localhost:5051/api/paises/${value}/ciudades`)
                .then(ciudades => {
                    this.setState({
                        ciudades,
                        ciudad: "",
                        pais: value,
                        disabled: false
                    });
                });
        } else if (name === "ciudad") {
            let newState = { ciudad: value } 
            
            var estadio = this.state.estadios.filter(estadio => estadio.ciudad.id === value);
            if (estadio.length) {
                newState.estadio = estadio[0].id;
            }
            
            this.setState(newState);
        } else if (name === "estadio") {
            this.setState({ estadio: value });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        let data = {
            id: this.state.id,
            nombre: this.state.nombre,
            ciudadId: this.state.ciudad,
            estadioId: this.state.estadio,
            imagen: this.state.imagen,
            nombre_corto: this.state.nombre_corto
        };
        let method = "POST";
        let url = "http://localhost:5051/api/equipos";

        if (this.state.update) {
            method = "PUT";
            url += "/" + data.id;
        }

        $.ajax(url, {
            data: JSON.stringify(data),
            method: method,
            contentType: "application/json",
            success: response => {
                console.log(response);
                alert("Cambios realizados correctamente.");
            }
        });
        return false;
    }

    render() {
        var paises = (<select id="pais" name="pais" className="form-control" disabled={this.state.disabled} value={this.state.pais} onChange={this.handleSelectChange}>
            <option value="">Seleccione un país</option>
            { this.state.paises.map((pais, i) => {
                return <option key={i} value={pais.id}>{pais.nombre}</option>;
            })}
        </select>);

        var ciudades = (<select id="ciudad" name="ciudad" className="form-control" disabled={this.state.disabled} value={this.state.ciudad} onChange={this.handleSelectChange}>
            <option value="">Seleccione una ciudad</option>
            { this.state.ciudades.map((ciudad, i) => {
                return <option key={i} value={ciudad.id} >{ciudad.nombre} ({ciudad.id})</option>;
            })}
        </select>);

        var estadios = (<select id="estadio" name="estadio" className="form-control" disabled={this.state.disabled} value={this.state.estadio} onChange={this.handleSelectChange}>
            { this.state.estadios.map((estadio, i) => {
                return <option key={i} value={estadio.id} >{estadio.nombre} ({estadio.ciudad.nombre})</option>;
            })}
        </select>);

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2> Equipo </h2>
                    <form className="horizontal-form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="id" className="col-sm-2 control-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="id" name="id"
                                    placeholder="ID" maxLength="2" value={this.state.id}
                                    onChange={this.handleInputChange} disabled={this.state.disabled || this.state.update} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre" className="col-sm-2 control-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nombre" name="nombre"
                                    placeholder="Nombre del Estadio" value={this.state.nombre}
                                    onChange={this.handleInputChange} disabled={this.state.disabled} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pais" className="col-sm-2 control-label">Pais:</label>
                            <div className="col-sm-10">
                               { paises }
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ciudad" className="col-sm-2 control-label">Ciudad:</label>
                            <div className="col-sm-10">
                               { ciudades }
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imagen" className="col-sm-2 control-label">Imagen:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="imagen" name="imagen"
                                    placeholder="Nombre del Archivo" value={this.state.imagen}
                                    onChange={this.handleInputChange} disabled={this.state.disabled} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_corto" className="col-sm-2 control-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nombre_corto" name="nombre_corto"
                                    placeholder="Nombre corto" value={this.state.nombre_corto}
                                    onChange={this.handleInputChange} disabled={this.state.disabled} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="estadio" className="col-sm-2 control-label">Estadio por defecto:</label>
                            <div className="col-sm-10">
                                { estadios }
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default" disabled={this.state.disabled} >Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};
