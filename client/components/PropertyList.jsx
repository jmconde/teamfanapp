import React from "react";
import Filter from './Filter.jsx';
import Config from "../../common/config.js";
import EditableInputText from "./EditableInputText.jsx";
import Message from "./Message.jsx";

export default class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            propertiesToShow: [],
            message: {
                title: null,
                message: ""
            }
        };
        this.filterHandler = this.filterHandler.bind(this);
        this.onUpdateProperty = this.onUpdateProperty.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    onUpdateProperty(property) {
        console.log(property);
        delete property.updatedAt
         $.ajax(`${Config.api}/properties/${property.id}`, {
            data: JSON.stringify(property),
            method: "PUT",
            contentType : "application/json",
            success: response => {
                this.showMessage("Propiedad Guardada", "La propiedad fue guardada correctamente.");
            }
        });
    }

    filterHandler(properties) {
        this.setState({
            propertiesToShow: properties
        });
    }

    componentDidMount() {
        $.getJSON(`${Config.api}/properties`, properties => {
            this.setState({
                properties,
                propertiesToShow: properties
             });
        });
    }

    showMessage(title, message) {
        console.log("aqui va")
        this.setState({
            message: {
                title: title,
                message: message,
                show: true
            }
        });
    }

    render() {
        var properties = this.state.propertiesToShow.map((prop, i) => {
            return(
                <tr key={i}>
                    <td>{prop.key}</td>
                    <td><EditableInputText field="value" model={ prop } onUpdate={ this.onUpdateProperty } /></td>
                    <td></td>
                </tr>
            );
        });

        return(
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Configuración</h3>
                    <Filter source = {this.state.properties} min="0" field="key" handler = { this.filterHandler } />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                    <th>Comandos</th>
                                </tr>
                            </thead>
                            <tbody>
                                { properties }
                            </tbody>
                        </table>
                </div>
                <Message message={ this.state.message } />
            </div>
        );
    }
};
