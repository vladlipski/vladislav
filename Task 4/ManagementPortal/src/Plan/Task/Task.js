import React, {PropTypes, Component} from 'react'
import {Alert, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CrudForm from "../../Shared/Components/CrudForm/CrudForm";
import TaskForm from "./TaskForm";
import {getTask, requestTaskUpdate, resetEditedTask} from "./taskActions";
import {browserHistory} from 'react-router';
import './task.css'
import {searchNodeImmutable} from "../../Shared/utils";


class Task extends Component {
    constructor(props) {
        super(props);
        this.submitUpdatedTask = this.submitUpdatedTask.bind(this);
    }

    componentWillMount() {
        const taskId = this.props.params.taskId;
        this.props.getTask(this.props.currentUserId, taskId);
        this.props.resetEditedTask();
    }

    componentWillReceiveProps(nextProps) {
        const planId = nextProps.params.planId;
        if (nextProps.editedTask.get('success')) {
            browserHistory.push('/plans/' + planId);
        }

        const taskId = nextProps.params.taskId;
        if (taskId !== this.props.params.taskId) {
           this.props.getTask(this.props.currentUserId, taskId);
            this.task = null;
        }

        if (!this.task) {
            const plan = nextProps.selectedPlan.getIn(['plan', 'plansData']);
            const node = searchNodeImmutable(plan, taskId);
            if (node && node.get('isLoaded')) {
                this.task = node;
            }
        }
    }

    submitUpdatedTask(updatedTask) {
        updatedTask.id = this.task.get('id');
        updatedTask.parent = this.task.get('parent');
        updatedTask.plan = this.task.get('plan');
        this.props.updateTask(updatedTask);
    }

    render() {
        const selectedTask = this.props.selectedTask;

        if (selectedTask.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(selectedTask.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {selectedTask.get('errorMessage')}
                </Alert>
            )
        } else if(!this.task) {
            return <span />
        }

        return (
            <Row>
                <Col smOffset={1} sm={10}>
                    <h2 className="task_header">Task: {this.task.get('title')}</h2>
                    <CrudForm
                        hideDeleteButton={true}
                        onSubmit={this.submitUpdatedTask}
                    >
                        <TaskForm
                            task={this.task.toJS()}
                        />
                    </CrudForm>
                </Col>
            </Row>
        );
    }
}

Task.propTypes = {
     selectedTask: PropTypes.object,
     selectedPlan: PropTypes.object,
     editedTask: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan']),
        selectedTask:  state.getIn(['plansManager', 'selectedTask']),
        editedTask:  state.getIn(['plansManager', 'editedTask'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTask: bindActionCreators(getTask, dispatch),
        updateTask: bindActionCreators(requestTaskUpdate, dispatch),
        resetEditedTask: bindActionCreators(resetEditedTask, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
