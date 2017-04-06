import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class DepartmentsList extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.user.roles;
        this.notAuthorizedPath = '/forbidden';
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem href="#">Link 1</ListGroupItem>
                <ListGroupItem href="#">Link 2</ListGroupItem>
                <ListGroupItem href="#">Link 2</ListGroupItem>
            </ListGroup>
        )
    }
}

DepartmentsList.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(DepartmentsList)