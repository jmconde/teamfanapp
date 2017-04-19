import React from "react";

export default class PaisForm extends React.Component {
    constructor(props) {
        super(props);
        let update = this.props.update || !!this.props.location.search;
        this.state = {
            id: "",
            nombre: "",
            disabled: true,
            update: update,
            paises: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
        if (this.state.update) {
            $.getJSON(`http://localhost:5051/api/torneos/${this.state.id}`, torneo => {
                this.setState({
                    id: torneo.id,
                    nombre: torneo.nombre,
                    pais: torneo.paisId
                });
            });
        }

        $.getJSON(`http://localhost:5051/api/paises`, paises => {
            this.setState({
                paises,
                disabled: false
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        console.log(this);
        this.setState({
            [name]: value
        });
    }

    submitForm(event) {
        event.preventDefault();
        let data = {
            id: this.state.id,
            nombre: this.state.nombre
        };
        let method = "POST";
        let url = "http://localhost:5051/api/paises";

        if (this.state.update) {
            method = "PUT";
            url += "/" + data.id;
        }

        $.ajax(url, {
            data: JSON.stringify(data),
            method: method,
            contentType : "application/json",
            success: response => {
                console.log(response);
            }
        });
        return false;
    }

    render() {
        var paises;
        if (this.state.paises)
            paises = (<select classID="pais" name="pais" className="form-control" disabled={this.state.disabled} value={this.state.pais} onChange={this.handleSelectChange}>
                <option key="-1" value="">Seleccione un país</option>
                { this.state.paises.map((pais, i) => {
                    return <option key={i} value={pais.id}>{pais.nombre}</option>;
                })}
            </select>);

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2> Torneo </h2>
                    <form className="horizontal-form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="in-id" className="col-sm-2 control-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="id" name="id"
                                    placeholder="ID" maxLength="2" value={this.state.id}
                                    onChange={this.handleInputChange} disabled={true} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="in-nombre" className="col-sm-2 control-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nombre" name="nombre"
                                    placeholder="Nombre del Pa&iacute;s" value={this.state.nombre}
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
