"use strict";

import React from "react";

export default class EditableInputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.model[props.field],
            editable: false
        };
        this.doubleClickHandler = this.doubleClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    doubleClickHandler(evt) {
        this.setState({
            editable: true
        });
    }

    componentDidUpdate() {
        if (this.state.editable) {
            this.element.focus();
        }
    }

    onFocus(evt) {
        console.log(evt.target)
        evt.target.select();
    }

    onChangeHandler(evt) {
        var target = evt.target;
        var value = target.value;
        this.setState({
            value: value
        });
    }

    onKeyPress(evt) {
        console.log(evt.key, evt.keyCode);
        if (evt.key === "Enter") {
            this.update();
        } else if (evt.key === "Escape") {
            this.cancel();
        }
    }

    cancel() {
        this.setState({
            editable: false,
            value: this.props.model[this.props.field]
        });
    }

    update () {
        this.props.model[this.props.field] = this.state.value;
        this.setState({
            editable: false
        });
        this.props.onUpdate(this.props.model);
    }

    render () {
        return (
            <div className="c-editable-text">
                <span onDoubleClick={ this.doubleClickHandler } className={ this.state.editable ? "hidden" : "" }>{this.state.value}</span>
                <div className={ this.state.editable ? "" : "hidden" }>
                    <input type="text" value={this.state.value}
                        onFocus={ this.onFocus } onChange={ this.onChangeHandler } onKeyDown={ this.onKeyPress }
                        ref={ input => this.element = input } />
                </div>
            </div>
        );
    }
}
