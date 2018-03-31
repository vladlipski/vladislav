import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForm";
import {bindActionCreators} from "redux";
import {requestUserCreation, resetNewUser} from "./userActions";
import {browserHistory} from 'react-router';
import {Row} from "formsy-react-components";
import {Role} from "../Auth/roles";
import CrudForm from "../Shared/Components/CrudForm";
import {Map} from "immutable";


class UserNew extends Component {
    constructor(props) {
        super(props);
        this.submitNewUser = this.submitNewUser.bind(this);
    }

    componentWillMount() {
        this.props.resetNewUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newUser.get('success')) {
            browserHistory.push('/users');
        }
    }

    submitNewUser(newUser) {
        const currentUser = this.props.currentUser;
        if (Role.isMentor(currentUser.get('role'))) {
            newUser.mentor = currentUser.get('id');
            newUser.department = currentUser.get('department');
        }
        this.props.createUser(newUser);
    }

    render() {
        const errorMessage = this.props.newUser.get('errorMessage');
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
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        hideDeleteButton={true}
                        onSubmit={this.submitNewUser}
                    >
                        <UserForm
                            user={Map()}
                            currentUserId={this.props.currentUser.get('id')}
                        />
                    </CrudForm>
                </Col>
            </Col>
        );
    }
}

UserNew.propTypes = {
    newUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUser:  state.getIn(['auth', 'user']),
        newUser: state.getIn(['usersManager', 'newUser'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: bindActionCreators(requestUserCreation, dispatch),
        resetNewUser: bindActionCreators(resetNewUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew)
