import React, {PropTypes, Component} from 'react'
import TreeView from "./TreeView";
import {Alert, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPlan} from "./planActions";
import {requestTaskCreation, requestTaskDeletion, resetDeletedTask, resetNewTask} from "./Task/taskActions";


class Plan extends Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.resetNewTask();
        this.props.resetDeletedTask();
    }

    componentWillMount() {
        this.reset();
        const planId = this.props.params.planId;
        if (planId) {
            this.props.getPlan(this.props.currentUserId, planId);
        }
    }

    addTask(node) {
        const newTask = {
            title: node.title,
            parent: node.parentNode ? node.parentNode.nodeId : null,
            plan: this.props.params.planId
        };
        this.props.createTask(newTask);
    }

    render() {
        const {selectedPlan, newTask, deletedTask} = this.props;
        const errorMessage = newTask.get('errorMessage') || deletedTask.get('errorMessage');

        if (selectedPlan.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(selectedPlan.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {selectedPlan.get('errorMessage')}
                </Alert>
            )
        } else if(!selectedPlan.get('plan')) {
            return <span />
        }

        return (
            <Row>
                <Col sm={4}>
                    <TreeView
                        levels={5}
                        data = {selectedPlan.getIn(['plan','plansData']).toJS()}
                        enableLinks={true}
                        showBorder={false}
                        highlightSelected={false}
                        selectable={false}
                        allowNew={true}
                        removable={true}
                        onNodeAdded={this.addTask}
                        onNodeRemoved={this.props.deleteTask}
                    />
                    {errorMessage &&
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    }
                </Col>
                <Col sm={8}>
                    {this.props.children}
                </Col>

                {/*<ConfirmationPopup*/}
                    {/*header={'Delete task'}*/}
                    {/*body={'Would you like to delete this task ?'}*/}
                    {/*showModal={this.state.showModal}*/}
                    {/*confirmClickHandler={this.props.onDeleteClick}*/}
                    {/*closeClickHandler={this.closeModal}*/}
                {/*/>*/}
            </Row>
        );
    }
}

Plan.propTypes = {
    selectedPlan: PropTypes.object,
    newTask: PropTypes.object,
    deletedTask: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan']),
        newTask:  state.getIn(['plansManager', 'newTask']),
        deletedTask:  state.getIn(['plansManager', 'deletedTask'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlan: bindActionCreators(getPlan, dispatch),
        createTask: bindActionCreators(requestTaskCreation, dispatch),
        resetNewTask: bindActionCreators(resetNewTask, dispatch),
        deleteTask: bindActionCreators(requestTaskDeletion, dispatch),
        resetDeletedTask: bindActionCreators(resetDeletedTask, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)
