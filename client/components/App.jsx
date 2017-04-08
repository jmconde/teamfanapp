import React from "react";
import { Router, Route, hashHistory } from "react-router";

import PaisForm from "./PaisForm.jsx";
import PaisList from "./PaisList.jsx";
import Header from "./Header.jsx";

export default class App extends React.Component {
    render () { // <PaisForm pais="CO" update={true} />
        // return (
        //     <div>
        //         <Header />
        //         <Router history={hashHistory}>
        //             <Route path="/" component={PaisList} />
        //             <Route path="/paises/edit" component={PaisForm} />
        //         </Router>
        //         <PaisList />
        //     </div>
        // );
        return (
            <div>
                <Header />
                <PaisList />
            </div>
        );
    }
}
