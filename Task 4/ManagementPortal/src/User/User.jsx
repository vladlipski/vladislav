import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {getUser} from "./userActions";
import {bindActionCreators} from "redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import AdminUserForm from "./UserForms/AdminUserForm";

class User extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.currentUserRoles;
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.getUser(this.props.currentUserId, this.props.params.id);
    }

    render() {
        const activeUser = this.props.activeUser;

        if (activeUser.isFetching) {
            return <h1>Loading...</h1>;
        } else if(activeUser.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {activeUser.errorMessage}
                </Alert>
            )
        } else if(!activeUser.user) {
            return <span />
        }
        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>User: {activeUser.user.username}</PageHeader>
                <AdminUserForm />
            </Col>
        );
    }
}

User.propTypes = {
    currentUserRoles: PropTypes.array,
    currentUserId: PropTypes.number,
    activeUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRoles: state.auth.user.roles,
        currentUserId: state.auth.user.id,
        activeUser: state.usersManager.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
