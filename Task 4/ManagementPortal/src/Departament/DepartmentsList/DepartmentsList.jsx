import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {getDepartments} from "../deprtmentActions";
import {LinkContainer} from "react-router-bootstrap";
import DepartmentsTable from "./DepartmentsTable";

class DepartmentsList extends Component {
    componentWillMount() {
        this.props.getDepartments();
    }

    render() {
        const departmentsList = this.props.departmentsList;

        if (departmentsList.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(departmentsList.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {departmentsList.get('errorMessage')}
                </Alert>
            )
        }

        return (
            <Col smOffset={2} sm={7}>
                <Row>
                    <LinkContainer to="departments/new">
                        <Button>
                            Add department
                        </Button>
                    </LinkContainer>
                </Row>
                <br/>
                <Row>
                    <DepartmentsTable
                        departments={departmentsList.get('departments').toJS()}
                    />
                </Row>
            </Col>
        )
    }
}

DepartmentsList.propTypes = {
    departmentsList: PropTypes.object
};

function mapStateToProps(state) {
    return {
        departmentsList: state.getIn(['departmentsManager', 'departmentsList'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDepartments: bindActionCreators(getDepartments, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsList)