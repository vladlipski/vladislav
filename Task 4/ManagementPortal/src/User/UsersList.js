import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {getUsers} from "./userActions";
import {bindActionCreators} from "redux";

class UsersList extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.roles;
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        if (this.userRoles.find((role) => role === 'admin')) {
            this.props.getUsers(0);
        } else {
            this.props.getUsers(this.props.currentUserId);
        }
    }

    renderList (usersList){
        if (usersList.isFetching) {
            return (
                <h1>Loading...</h1>
            )
        }
        return usersList.users.map((user) => {
            return (
                <ListGroupItem key={user.id} href="#">{user.username}</ListGroupItem>
            );
        });
    }

    render() {
        const usersList = this.props.usersList;

        return (
            <ListGroup>
                {this.renderList(usersList)}
            </ListGroup>
        )
    }
}

UsersList.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        roles: state.auth.user.roles,
        currentUserId: state.auth.user.id,
        usersList: state.usersManager.usersList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: bindActionCreators(getUsers, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
