import React from "react";
import { Modal, Button } from "react-bootstrap";

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModal: props.message.show,
            title: props.message.title,
            message: props.message.message
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.message.show,
            title: nextProps.message.title,
            message: nextProps.message.message
        });
    }
    

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                { 
                    (this.state.title) ? 
                        <Modal.Header closeButton>
                            <Modal.Title>{ this.state.title }</Modal.Title>
                        </Modal.Header> : undefined }
                <Modal.Body>
                   <div>{ this.state.message }</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
