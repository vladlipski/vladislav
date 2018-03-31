import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Alert, Col, Row} from "react-bootstrap";
import CrudForm from "../Shared/Components/CrudForm";
import PlanForm from "./PlanForm";
import {bindActionCreators} from "redux";
import {requestPlanDeletion, requestPlanUpdate, resetEditedPlan} from "./planActions";
import {browserHistory} from 'react-router';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.updatePlan = this.updatePlan.bind(this);
        this.deletePlanClick = this.deletePlanClick.bind(this);
    }

    componentWillMount() {
        this.props.resetEditedPlan();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editedPlan.get('success')) {
            browserHistory.push('/plans');
        }
    }

    updatePlan(plan) {
        const selectedPlan = this.props.selectedPlan;
        plan.id = selectedPlan.getIn(['plan', 'id']);
        this.props.updatePlan(plan);
    }

    deletePlanClick() {
        const selectedPlan = this.props.selectedPlan;
        this.props.deletePlan(selectedPlan.getIn(['plan', 'id']));
    }

    render() {
        const {selectedPlan} = this.props;

        const errorMessage = this.props.editedPlan.get('errorMessage');

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
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        hideDeleteButton={false}
                        onSubmit={this.updatePlan}
                        onDeleteClick={this.deletePlanClick}
                        popupHeader={'Delete plan'}
                        popupBody={'Would you like to delete ' + selectedPlan.getIn(['plan', 'title']) + ' plan?'}
                    >
                        <PlanForm
                            plan={selectedPlan.get('plan')}
                        />
                    </CrudForm>
                </Col>
            </Row>
        );
    }
}

Plan.propTypes = {
    selectedPlan: PropTypes.object,
    editedPlan: PropTypes.object
};

function mapStateToProps(state) {
    return {
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan']),
        editedPlan:  state.getIn(['plansManager', 'editedPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePlan: bindActionCreators(requestPlanUpdate, dispatch),
        deletePlan: bindActionCreators(requestPlanDeletion, dispatch),
        resetEditedPlan: bindActionCreators(resetEditedPlan, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Plan)
