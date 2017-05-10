import React, {PropTypes, Component} from 'react'
import {Alert, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CrudForm from "../../Shared/Components/CrudForm/CrudForm";
import TaskForm from "./TaskForm";
import {getTask} from "./taskActions";


class Task extends Component {

    componentWillMount() {
        const taskId = this.props.params.taskId;
        if (taskId) {
            this.props.getTask(this.props.currentUserId, taskId);
        }
        console.log(taskId);
    }

    componentWillReceiveProps(nextProps) {
        const taskId = nextProps.params.taskId;

        if (taskId !== this.props.params.taskId) {
           this.props.getTask(this.props.currentUserId, taskId);
            console.log('GET');
        }
    }

    submitUpdatedTask() {
        console.log('Update');
    }

    deleteTaskClick() {
        console.log('Delete');
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
                        creation={false}
                        onSubmit={this.submitUpdatedTask}
                        onDeleteClick={this.deleteTaskClick}
                        popupHeader={'Delete task'}
                        popupBody={'Would you like to delete ' + selectedTask.getIn(['task', 'title']) + '?'}
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
    // updatedDepartment: PropTypes.object,
    // deletedDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedTask:  state.getIn(['plansManager', 'selectedTask'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTask: bindActionCreators(getTask, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
