import React from "react";
import Q from "q";

export default class PaisForm extends React.Component {
    constructor(props) {
        super(props);
        let update = this.props.update || !!this.props.location.search;
        this.state = {
            id: this.props.location.search.substring(1) || "",
            disabled: true,
            update: update,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        var promise;
        if (this.state.update) {
            promise = $.getJSON(`http://localhost:5051/api/estadio/${this.state.id}`)
                .then(estadio => {
                    return {
                        source: estadio,
                        nombre: estadio.nombre,
                        id: estadio.id,
                        ciudad: estadio.ciudad.id,
                        pais: estadio.ciudad.pais.id
                    };
                })
        } else {
            promise = Q({
                source: {},
                nombre: "",
                id: "",
                ciudad: "",
                pais: ""
            });
        }

        promise.then(estadio => {
            return $.getJSON(`http://localhost:5051/api/paises`);
        }).then(paises => {
                this.setState({
                    paises
                });
                return $.getJSON(`http://localhost:5051/api/paises/${this.state.pais}/ciudades`);
            })

            .then(ciudades => {
                this.setState({
                    ciudades,
                    disabled: false
                });
            });
    } 

    handleSelectChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "pais") {
            $.getJSON(`http://localhost:5051/api/paises/${value}/ciudades`)
                .then(ciudades => {
                    this.setState({ ciudades })
                });
        } else if (name === "ciudad") {
            this.setState({ ciudad: value });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    submitForm(event) {
        event.preventDefault();
        let data = {
            id: this.state.id,
            nombre: this.state.nombre,
            ciudadId: this.state.ciudad
        };
        console.log(data);

        let method = "POST";
        let url = "http://localhost:5051/api/estadios";

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
        var paises, ciudades;
        if (this.state.paises)
            paises = (<select classID="pais" name="pais" className="form-control" disabled={this.state.disabled} value={this.state.pais} onChange={this.handleSelectChange}>
                { this.state.paises.map((pais, i) => {
                    return <option key={i} value={pais.id}>{pais.nombre}</option>;
                })}
            </select>);

        if (this.state.ciudades)
            ciudades = (<select classID="ciudad" name="ciudad" className="form-control" disabled={this.state.disabled} value={this.state.ciudad} onChange={this.handleSelectChange}>
                { this.state.ciudades.map((ciudad, i) => {
                    return <option key={i} value={ciudad.id} >{ciudad.nombre}</option>;
                })}
            </select>);

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2> Estadio </h2>
                    <form className="horizontal-form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="id" className="col-sm-2 control-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="id" name="id"
                                    placeholder="ID" maxLength="2" value={this.state.id}
                                    onChange={this.handleInputChange} disabled={true} />
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
