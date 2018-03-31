import React, {PropTypes, Component} from 'react'
import TreeView from "../TreeView/index";
import {Alert, Col, Grid, PageHeader, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPlan} from "../planActions";
import {requestTaskCreation, requestTaskDeletion, resetEditedTask} from "../Task/taskActions";
import {Link} from "react-router";


class PlanManager extends Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount() {
        this.props.resetEditedTask();
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
        const {selectedPlan, selectedTask} = this.props;
        const errorMessage = selectedTask.get('errorMessage');

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
            <Grid>
                <Row>
                    <PageHeader>
                        <Link to={'/plans/' + selectedPlan.getIn(['plan', 'id'])}>
                            Plan: {selectedPlan.getIn(['plan', 'title'])}
                        </Link>
                    </PageHeader>
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
                    </Col>
                    <Col sm={8}>
                        {this.props.children}
                    </Col>
                </Row>
                <Row>
                    <Col smOffset={1} sm={10}>
                        {errorMessage &&
                            <Alert bsStyle="danger">
                                {errorMessage}
                            </Alert>
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

PlanManager.propTypes = {
    selectedPlan: PropTypes.object,
    selectedTask: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan']),
        selectedTask:  state.getIn(['plansManager', 'selectedTask'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlan: bindActionCreators(getPlan, dispatch),
        createTask: bindActionCreators(requestTaskCreation, dispatch),
        resetEditedTask: bindActionCreators(resetEditedTask, dispatch),
        deleteTask: bindActionCreators(requestTaskDeletion, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanManager)
