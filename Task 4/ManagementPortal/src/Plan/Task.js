import React, {PropTypes, Component} from 'react'
import TreeView from "./TreeView/TreeView";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPlan} from "./planActions";


class Task extends Component {

    componentWillMount() {
        const taskId = this.props.params.taskId;
        if (taskId) {
            //this.props.getTask(taskId);
            console.log(taskId)
        }
    }


    render() {

        return (
            <Row>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail1">
                        <Col componentClass={ControlLabel} sm={2}>
                            Status
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword1">
                        <Col componentClass={ControlLabel} sm={2}>
                            Type
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="button">
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
        );
    }
}

Task.propTypes = {
    // selectedPlan: PropTypes.object,
    // updatedDepartment: PropTypes.object,
    // deletedDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        //selectedPlan:  state.getIn(['plansManager', 'selectedPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //getPlan: bindActionCreators(getPlan, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
