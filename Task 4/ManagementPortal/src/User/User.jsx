import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {getUser, editUser, resetActiveUser, resetUpdatedUser} from "./userActions";
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
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.resetActiveUser();
        this.props.resetUpdatedUser();
        const userId = this.props.params.id;
        if (userId) {
            this.props.getUser(this.props.currentUserId, userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedUser.success) {
            browserHistory.push('/users');
        }
    }

    render() {
        const activeUser = this.props.activeUser;
        const errorMessage = this.props.updatedUser.errorMessage;

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
                    onSubmit={(user) => {
                        user.id = activeUser.user.id;
                        this.props.editUser(user);
                    }}
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
        updatedUser: state.usersManager.updatedUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch),
        editUser: bindActionCreators(editUser, dispatch),
        resetActiveUser: bindActionCreators(resetActiveUser, dispatch),
        resetUpdatedUser: bindActionCreators(resetUpdatedUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
