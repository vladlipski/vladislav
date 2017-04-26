import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Row} from "react-bootstrap";
import {getAllUsers, getUsersByMentor, resetUsers} from "../userActions";
import {bindActionCreators} from "redux";
import {LinkContainer} from "react-router-bootstrap";
import {Role} from "../../Auth/roles";
import UsersTable from "./UsersTable";


class UsersList extends Component {
    componentWillMount() {
        this.props.resetUsers();
        if (Role.isAdmin(this.props.currentUserRole)) {
            this.props.getAllUsers();
        } else {
            this.props.getUsersByMentor(this.props.currentUserId);
        }
    }

    render() {
        const usersList = this.props.usersList;

        if (usersList.isFetching) {
            return <h1>Loading...</h1>;
        } else if(usersList.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {usersList.errorMessage}
                </Alert>
            )
        }

        return (
            <Row>
                <Row>
                    <LinkContainer to="users/new">
                        <Button>
                            Add user
                        </Button>
                    </LinkContainer>
                </Row>
                <br/>
                <Row>
                    <UsersTable
                        users={usersList.users}
                    />
                </Row>
            </Row>
        )
    }
}

UsersList.propTypes = {
    currentUserRoles: PropTypes.string,
    currentUserId: PropTypes.number,
    usersList: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
        currentUserId: state.auth.user.id,
        usersList: state.usersManager.usersList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsersByMentor: bindActionCreators(getUsersByMentor, dispatch),
        getAllUsers: bindActionCreators(getAllUsers, dispatch),
        resetUsers: bindActionCreators(resetUsers, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)