"use strict";

import React from "react";

export default class FormBase extends React.Component {
    constructor(props) {
        super(props)
        let update = this.props.update || !!this.props.location.search;

        this.state = {
            id: this.props.location.search.substring(1) || "",
            disabled: true,
            update: update,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSelectChange(event) {
        if (this.onSelectChange) this.onSelectChange(event);
    }

    submitForm(event) {
        if (this.onSubmit) this.onsubmit(event);
    }
}
