import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {Alert, ListGroup, ListGroupItem} from "react-bootstrap";
import {getUsers} from "./userActions";
import {bindActionCreators} from "redux";
import {LinkContainer} from "react-router-bootstrap";


class UsersList extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.currentUserRoles;
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.getUsers(this.props.currentUserId);
    }

    renderList(usersList){
        if (usersList.isFetching) {
            return <h1>Loading...</h1>;
        } else if(usersList.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {usersList.errorMessage}
                </Alert>
            )
        } else if(!usersList.users) {
            return <span />
        }
        return usersList.users.map((user) => {
            return (
                <LinkContainer key={user.id} to={"/users/".concat(user.id)}>
                    <ListGroupItem>{user.username}</ListGroupItem>
                </LinkContainer>
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
    currentUserRoles: PropTypes.array,
    currentUserId: PropTypes.number,
    usersList: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRoles: state.auth.user.roles,
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
