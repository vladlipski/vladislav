import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Col, Row} from "react-bootstrap";
import {getAllUsers, getUsersByMentor} from "../userActions";
import {bindActionCreators} from "redux";
import {LinkContainer} from "react-router-bootstrap";
import {Role} from "../../Auth/roles";
import UsersTable from "./UsersTable";


class UsersList extends Component {
    componentWillMount() {
        if (Role.isAdmin(this.props.currentUserRole)) {
            this.props.getAllUsers();
        } else {
            this.props.getUsersByMentor(this.props.currentUserId);
        }
    }

    render() {

        const usersList = this.props.usersList;

        if (usersList.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(usersList.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {usersList.get('errorMessage')}
                </Alert>
            )
        }

        return (
            <Col smOffset={2} sm={7}>
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
                        users={usersList.get('users').toJS()}
                    />
                </Row>
            </Col>
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
        currentUserRole: state.getIn(['auth', 'user', 'role']),
        currentUserId: state.getIn(['auth', 'user', 'id']),
        usersList: state.getIn(['usersManager', 'usersList'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsersByMentor: bindActionCreators(getUsersByMentor, dispatch),
        getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
