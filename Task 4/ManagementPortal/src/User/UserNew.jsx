import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForms/UserForm";
import {bindActionCreators} from "redux";
import {addUser, resetNewUser} from "./userActions";
import {browserHistory} from 'react-router';
import {Row} from "formsy-react-components";


class UserNew extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  [this.props.currentUserRole];
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.resetNewUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newUser.success) {
            browserHistory.push('/users');
        }
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
                <UserForm
                    user={{}}
                    onSubmit={(user) => {this.props.addUser(user)}}
                />
            </Col>
        );
    }
}

UserNew.propTypes = {
    currentUserRole: PropTypes.string
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
        newUser: state.usersManager.newUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        resetNewUser: bindActionCreators(resetNewUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew)
