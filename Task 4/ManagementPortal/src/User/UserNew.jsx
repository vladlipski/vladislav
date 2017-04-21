import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForms/UserForm";
import {bindActionCreators} from "redux";
import {requestUserCreation, resetNewUser} from "./userActions";
import {browserHistory} from 'react-router';
import {Row} from "formsy-react-components";
import {Role} from "../Auth/roles";
import CrudForm from "../CrudForm/CrudForm";


class UserNew extends Component {
    constructor(props) {
        super(props);
        this.submitNewUser = this.submitNewUser.bind(this);
    }

    componentWillMount() {
        this.props.resetNewUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newUser.success) {
            browserHistory.push('/users');
        }
    }

    submitNewUser(newUser) {
        const currentUser = this.props.currentUser;
        if (Role.isMentor(currentUser.role)) {
            newUser.mentor = currentUser.id;
            newUser.department = currentUser.department;
        }
        this.props.createUser(newUser);
    }

    render() {
        const errorMessage = this.props.newUser.errorMessage;
        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>New user</PageHeader>
                {errorMessage &&
                    <Row>
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </Row>
                }

                <CrudForm
                    creation={true}
                    onSubmit={this.submitNewUser}
                >
                    <UserForm
                        user={{}}
                    />
                </CrudForm>
            </Col>
        );
    }
}

UserNew.propTypes = {
    newUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        newUser: state.usersManager.newUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: bindActionCreators(requestUserCreation, dispatch),
        resetNewUser: bindActionCreators(resetNewUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew)
