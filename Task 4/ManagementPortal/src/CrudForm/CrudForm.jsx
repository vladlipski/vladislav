import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import {Form, Row} from 'formsy-react-components';
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup ";
import {ButtonToolbar} from "react-bootstrap";


class CrudForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Form
                onValidSubmit={this.props.onSubmit}
                noValidate
            >

                {this.props.children}

                <ConfirmationPopup
                    header={this.props.popupHeader}
                    body={this.props.popupBody}
                    showModal={this.state.showModal}
                    confirmClickHandler={this.props.onDeleteClick}
                    closeClickHandler={this.closeModal}
                />

                <Row layout={'horizontal'}>
                    <ButtonToolbar>
                        <Button type="submit">Ok</Button>
                        <Button
                            onClick={this.openModal}
                            bsStyle="danger"
                            className={this.props.creation ? '' : 'hidden'}
                        >
                            Delete
                        </Button>
                    </ButtonToolbar>
                </Row>
            </Form>
        );
    }
}

CrudForm.propTypes = {
    creation: PropTypes.bool,
    onSubmit: PropTypes.func,
    onDeleteClick: PropTypes.func,
    popupHeader: PropTypes.string,
    popupBody: PropTypes.string
};

export default CrudForm
