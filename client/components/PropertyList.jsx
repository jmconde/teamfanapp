import React from "react";
import Filter from './Filter.jsx';

export default class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [],
            propertiesToShow: []
        };
        this.filterHandler = this.filterHandler.bind(this);
    }

    filterHandler(properties) {
        this.setState({
            propertiesToShow: properties
        });
    }

    componentDidMount() {
        $.getJSON("http://localhost:5051/api/properties", properties => {
            this.setState({
                properties,
                propertiesToShow: properties
             });
        });
    }

    render() {
        var properties = this.state.propertiesToShow.map((prop, i) => {
            return(
                <tr key={i}>
                    <td>{prop.key}</td>
                    <td>{prop.value}</td>
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
            </div>
        );
    }
};
