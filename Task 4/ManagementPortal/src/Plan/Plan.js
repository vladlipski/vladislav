import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Alert, Col, Row} from "react-bootstrap";
import CrudForm from "../Shared/Components/CrudForm";
import PlanForm from "./PlanForm";
import {bindActionCreators} from "redux";
import {requestPlanDeletion, requestPlanUpdate, resetDeletedPlan, resetUpdatedPlan} from "./planActions";
import {browserHistory} from 'react-router';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.updatePlan = this.updatePlan.bind(this);
        this.deletePlanClick = this.deletePlanClick.bind(this);
    }

    componentWillMount() {
        this.props.resetUpdatedPlan();
        this.props.resetDeletedPlan();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedPlan.get('success') || nextProps.deletedPlan.get('success')) {
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

        const errorMessage = this.props.updatedPlan.get('errorMessage') || this.props.deletedPlan.get('errorMessage');

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
    updatedPlan: PropTypes.object,
    deletedPlan: PropTypes.object
};

function mapStateToProps(state) {
    return {
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan']),
        updatedPlan:  state.getIn(['plansManager', 'updatedPlan']),
        deletedPlan:  state.getIn(['plansManager', 'deletedPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePlan: bindActionCreators(requestPlanUpdate, dispatch),
        deletePlan: bindActionCreators(requestPlanDeletion, dispatch),
        resetUpdatedPlan: bindActionCreators(resetUpdatedPlan, dispatch),
        resetDeletedPlan: bindActionCreators(resetDeletedPlan, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Plan)
