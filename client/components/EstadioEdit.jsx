import React from "react";

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
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
        if (this.state.update) {

            $.getJSON(`http://localhost:5051/api/estadio/${this.state.id}`)

            $.getJSON(`http://localhost:5051/api/estadio/${this.state.id}`)
                .then(estadio => {
                    console.log(estadio);
                    this.setState({
                        source: estadio,
                        nombre: estadio.nombre,
                        id: estadio.id,
                        ciudad: estadio.ciudad.id,
                        pais: estadio.ciudad.pais.id
                    });
                    return $.getJSON(`http://localhost:5051/api/paises`);
                })
                .then(paises => {
                    this.setState({
                        paises
                    });
                     return $.getJSON(`http://localhost:5051/api/paises/${this.state.estadio.ciudad.pais.id}/ciudades`);
                })

                .then(ciudades => {
                    this.setState({
                        ciudades
                    });
                })
                .then(()=>{
                    console.log(this.state);
                });
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
            contentType: "application/json",
            success: response => {
                console.log(response);
            }
        });
        return false;
    }

    render() {
        var paises;
        if (this.state.paises)
            paises = (<select className="form-control">
                { this.state.paises.map(pais => {
                    return <option value={pais.id} selected={pais.id === this.state.pais}>{pais.nombre}</option>;
                })}
            </select>);

        /*
        <select class="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        */
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
                            <label htmlFor="ciudad" className="col-sm-2 control-label">Ciudad:</label>
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
