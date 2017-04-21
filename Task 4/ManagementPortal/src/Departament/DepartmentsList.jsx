import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {getDepartments, resetDepartments} from "./deprtmentActions";
import {LinkContainer} from "react-router-bootstrap";

class DepartmentsList extends Component {
    componentWillMount() {
        this.props.resetDepartments();
        this.props.getDepartments();
    }

    renderList(departmentsList){
        if (departmentsList.isFetching) {
            return <h1>Loading...</h1>;
        } else if(departmentsList.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {departmentsList.errorMessage}
                </Alert>
            )
        } else if(!departmentsList.departments) {
            return <span />
        }
        return departmentsList.departments.map((department) => {
            return (
                <LinkContainer key={department.id} to={"/departments/".concat(department.id)}>
                    <ListGroupItem>{department.title}</ListGroupItem>
                </LinkContainer>
            );
        });
    }

    render() {
        const departmentsList = this.props.departmentsList;
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
                    <ListGroup>
                        {this.renderList(departmentsList)}
                    </ListGroup>
                </Row>
            </Col>
        )
    }
}

DepartmentsList.propTypes = {
    departmentsList: PropTypes.array
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