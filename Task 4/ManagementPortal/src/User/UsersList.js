import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {Alert, Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {getUsers} from "./userActions";
import {bindActionCreators} from "redux";
import {LinkContainer} from "react-router-bootstrap";

class UsersList extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles = [this.props.currentUserRole];
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
                    <ListGroup>
                        {this.renderList(usersList)}
                    </ListGroup>
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
        currentUserRole: state.auth.user.role,
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