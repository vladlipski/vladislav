import React, {Component, PropTypes} from 'react';
import {Table} from "react-bootstrap";
import {browserHistory} from 'react-router';

class PlansTable extends Component {

    rowClick(id) {
        browserHistory.push('/plans/' + id);
    }

    renderList(plans) {
        return plans.map((plan) => {
            return (
                <tr key={plan.id} onClick={this.rowClick.bind(this, plan.id)}>
                    <td>{plan.id}</td>
                    <td>{plan.title}</td>
                    <td>{plan.author ? plan.author.username : ''}</td>
                </tr>
            );
        });
    }

    render() {
        const plans = this.props.plans;
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderList(plans)}
                </tbody>
            </Table>
        )
    }
}

PlansTable.propTypes = {
    plans: PropTypes.array
};

export default PlansTable
