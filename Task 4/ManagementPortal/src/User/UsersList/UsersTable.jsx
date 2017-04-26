import React, {Component, PropTypes} from 'react';
import {Table} from "react-bootstrap";
import {browserHistory} from 'react-router';

class UsersTable extends Component {

    rowClick(id) {
        browserHistory.push('/users/' + id);
    }

    renderList(users) {
        return users.map((user) => {
            return (
                <tr key={user.id} onClick={this.rowClick.bind(this, user.id)}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                </tr>
            );
        });
    }

    render() {
        const users = this.props.users;
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderList(users)}
                </tbody>
            </Table>
        )
    }
}

UsersTable.propTypes = {
    users: PropTypes.array
};

export default UsersTable
