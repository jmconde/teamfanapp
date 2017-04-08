import React from "react";

export default class PaisForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nombre: "",
            disabled: true,
            update: props.update,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        if (this.state.update) {
            $.getJSON(`http://localhost:5051/api/paises/${this.props.pais}`, pais => {
                console.log("pais", pais);
                this.setState({
                    id: pais.id,
                    nombre: pais.nombre,
                    disabled: false
                });
            });
        }
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
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2> Pa&iacute;s </h2>
                    <form className="horizontal-form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="in-id" className="col-sm-2 control-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="id" name="id"
                                    placeholder="ID" maxLength="2" value={this.state.id}
                                    onChange={this.handleInputChange} disabled={this.state.disabled || this.state.update} />
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
