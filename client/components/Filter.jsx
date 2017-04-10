"use strict";

import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            placeholder: this.props.placeholder || "Digita tu búsqueda...",
            items: this.props.source.slice(0),
            minChars: this.props.min || 3,
            field: this.props.field 
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const target = ev.target;
        const value = target.value;

        if (value.length >= this.state.minChars) {
            var filtered = this.state.items.filter(item => {
                return item[this.state.field].toUpperCase().indexOf(value.toUpperCase()) !== -1;
            });            
            this.props.handler(filtered);
        } else {
            this.props.handler(this.props.source);
        }
        

        
        // this.setState({
        //     disabled: false
        // });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.source.slice(0)
        });
    }

    submitForm(ev) {
        ev.preventDefault();
    }

    render () {
        return (
            <form className="horizontal-form" onSubmit={this.submitForm}>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="text" className="form-control" id="filter" name="filter"
                            placeholder={this.state.placeholder} onChange={this.handleChange} disabled={this.state.disabled} />
                    </div>
                </div>
            </form>
        );
    };
}
