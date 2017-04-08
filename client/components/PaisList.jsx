import React from "react";

export default class PaisList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paises: []
        };
    }

    componentDidMount() {
        $.getJSON("http://localhost:5051/api/paises", paises => {
            this.setState({ paises });
        });
    }

    render() {
        var paises = this.state.paises.map(pais => {
            return (
                <tr key={pais.id}>
                    <td>{pais.id}</td>
                    <td>{pais.nombre}</td>
                    <td></td>
                </tr>
            )
        });

        return(
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h3>Lista de Paises</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Comandos</th>
                            </tr>
                        </thead>
                        <tbody>
                            { paises }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
