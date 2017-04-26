import React, {Component, PropTypes} from 'react';
import {Table} from "react-bootstrap";
import {browserHistory} from 'react-router';

class DepartmentsTable extends Component {

    rowClick(id) {
        browserHistory.push('/departments/' + id);
    }

    renderList(departments) {
        return departments.map((department) => {
            return (
                <tr key={department.id} onClick={this.rowClick.bind(this, department.id)}>
                    <td>{department.id}</td>
                    <td>{department.title}</td>
                </tr>
            );
        });
    }

    render() {
        const departments = this.props.departments;
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderList(departments)}
                </tbody>
            </Table>
        )
    }
}

DepartmentsTable.propTypes = {
    departments: PropTypes.array
};

export default DepartmentsTable
