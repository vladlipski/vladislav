import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Col, Row} from "react-bootstrap";
import {getAllUsers, getUsersByMentor, resetUsers} from "./userActions";
import {bindActionCreators} from "redux";
import {LinkContainer} from "react-router-bootstrap";
import {Role} from "../Auth/roles";
import List from "../List";


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
                    <List
                        displayedProp={'username'}
                        entityList={usersList}
                        entityName={'users'}
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
