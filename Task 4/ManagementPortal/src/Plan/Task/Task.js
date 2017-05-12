import React, {PropTypes, Component} from 'react'
import {Alert, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CrudForm from "../../Shared/Components/CrudForm/CrudForm";
import TaskForm from "./TaskForm";
import {getTask, requestTaskUpdate, resetUpdatedTask} from "./taskActions";
import {browserHistory} from 'react-router';


class Task extends Component {
    constructor(props) {
        super(props);
        this.submitUpdatedTask = this.submitUpdatedTask.bind(this);
    }

    componentWillMount() {
        const taskId = this.props.params.taskId;
        if (taskId) {
            this.props.getTask(this.props.currentUserId, taskId);
            this.props.resetUpdatedTask();
        }
    }

    componentWillReceiveProps(nextProps) {
        const planId = nextProps.params.planId;
        if (nextProps.updatedTask.get('success')) {
            browserHistory.push('/plans/' + planId);
        }

        const taskId = nextProps.params.taskId;

        if (taskId !== this.props.params.taskId) {
           this.props.getTask(this.props.currentUserId, taskId);
        }
    }

    submitUpdatedTask(updatedTask) {
        const task = this.props.selectedTask.get('task');
        updatedTask.id = task.get('id');
        updatedTask.parent = task.get('parent');
        updatedTask.plan = task.get('plan');
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
        } else if(!selectedTask.get('task')) {
            return <span />
        }

        return (
            <Row>
                <Col smOffset={1} sm={10}>
                    <CrudForm
                        hideDeleteButton={true}
                        onSubmit={this.submitUpdatedTask}
                    >
                        <TaskForm
                            task={selectedTask.get('task').toJS()}
                        />
                    </CrudForm>
                </Col>
            </Row>

        );
    }
}

Task.propTypes = {
     selectedTask: PropTypes.object,
     updatedTask: PropTypes.object,
    // deletedDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedTask:  state.getIn(['plansManager', 'selectedTask']),
        updatedTask:  state.getIn(['plansManager', 'updatedTask'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTask: bindActionCreators(getTask, dispatch),
        updateTask: bindActionCreators(requestTaskUpdate, dispatch),
        resetUpdatedTask: bindActionCreators(resetUpdatedTask, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
