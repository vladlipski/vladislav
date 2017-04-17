import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {
    getUser, requestUserDeletion, requestUserUpdate, resetActiveUser, resetDeletedUser,
    resetUpdatedUser
} from "./userActions";
import {bindActionCreators} from "redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForms/UserForm";
import {Row} from "formsy-react-components";
import {browserHistory} from 'react-router';


class User extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  [this.props.currentUserRole];
        this.notAuthorizedPath = '/forbidden';
        this.submitUpdatedUser = this.submitUpdatedUser.bind(this);
        this.deleteUserClick = this.deleteUserClick.bind(this);
    }

    reset() {
        this.props.resetActiveUser();
        this.props.resetUpdatedUser();
        this.props.resetDeletedUser();
    }

    componentWillMount() {
        super.componentWillMount();
        this.reset();
        const userId = this.props.params.id;
        if (userId) {
            this.props.getUser(this.props.currentUserId, userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedUser.success || nextProps.deletedUser.success) {
            browserHistory.push('/users');
        }
    }

    submitUpdatedUser(updatedUser) {
        const user = this.props.activeUser.user;
        updatedUser.id = user.id;
        this.props.updateUser(updatedUser);
    }

    deleteUserClick() {
        const user = this.props.activeUser.user;
        this.props.deleteUser(user.id);
    }

    render() {
        const activeUser = this.props.activeUser;
        const errorMessage = this.props.updatedUser.errorMessage || this.props.deletedUser.errorMessage;

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
                {errorMessage &&
                    <Row>
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </Row>
                }
                <UserForm
                    user={activeUser.user}
                    onSubmit={this.submitUpdatedUser}
                    onDeleteClick={this.deleteUserClick}
                />
            </Col>
        );
    }
}

User.propTypes = {
    currentUserRole: PropTypes.string,
    currentUserId: PropTypes.number,
    activeUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
        currentUserId: state.auth.user.id,
        activeUser: state.usersManager.activeUser,
        updatedUser: state.usersManager.updatedUser,
        deletedUser: state.usersManager.deletedUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch),
        updateUser: bindActionCreators(requestUserUpdate, dispatch),
        deleteUser: bindActionCreators(requestUserDeletion, dispatch),
        resetActiveUser: bindActionCreators(resetActiveUser, dispatch),
        resetUpdatedUser: bindActionCreators(resetUpdatedUser, dispatch),
        resetDeletedUser: bindActionCreators(resetDeletedUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
