import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {getDepartments, resetDepartments} from "./deprtmentActions";
import {LinkContainer} from "react-router-bootstrap";
import List from "../List";

class DepartmentsList extends Component {
    componentWillMount() {
        this.props.resetDepartments();
        this.props.getDepartments();
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
                    <List
                        displayedProp={'title'}
                        entityList={departmentsList}
                        entityName={'departments'}
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