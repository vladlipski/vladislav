import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class DepartmentsList extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  [this.props.role];
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
    role: PropTypes.string
};

function mapStateToProps(state) {
    return {
        role: state.auth.user.role
    }
}

export default connect(mapStateToProps)(DepartmentsList)