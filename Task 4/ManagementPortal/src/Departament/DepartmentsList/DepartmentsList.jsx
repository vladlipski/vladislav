import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {getDepartments, resetDepartments} from "../deprtmentActions";
import {LinkContainer} from "react-router-bootstrap";
import DepartmentsTable from "./DepartmentsTable";

class DepartmentsList extends Component {
    componentWillMount() {
        this.props.resetDepartments();
        this.props.getDepartments();
    }

    render() {
        const departmentsList = this.props.departmentsList;

        if (departmentsList.isFetching) {
            return <h1>Loading...</h1>;
        } else if(departmentsList.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {departmentsList.errorMessage}
                </Alert>
            )
        }

        return (
            <Row>
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
                        departments={departmentsList.departments}
                    />
                </Row>
            </Row>
        )
    }
}

DepartmentsList.propTypes = {
    departmentsList: PropTypes.object
};

function mapStateToProps(state) {
    return {
        departmentsList: state.departmentsManager.departmentsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDepartments: bindActionCreators(getDepartments, dispatch),
        resetDepartments: bindActionCreators(resetDepartments, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsList)