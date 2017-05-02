import React, {PropTypes, Component} from 'react'
import {Button, Modal} from "react-bootstrap";

class ConfirmationPopup extends Component {
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeClickHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.props.confirmClickHandler();
                            this.props.closeClickHandler();
                        }}
                        bsStyle="danger"
                    >
                        Yes
                    </Button>
                    <Button onClick={this.props.closeClickHandler}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

ConfirmationPopup.propTypes = {
    header: PropTypes.string,
    body: PropTypes.string,
    closeClickHandler: PropTypes.func,
    confirmClickHandler: PropTypes.func,
    showModal: PropTypes.bool
};

export default ConfirmationPopup