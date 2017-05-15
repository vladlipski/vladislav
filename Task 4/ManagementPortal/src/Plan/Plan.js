import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import CrudForm from "../Shared/Components/CrudForm";
import PlanForm from "./PlanForm";


class Plan extends Component {
    constructor(props) {
        super(props);
        this.updatePlan = this.updatePlan.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
    }

    updatePlan(plan) {
        const selectedPlan = this.props.selectedPlan;
        plan.id = selectedPlan.getIn(['plan', 'id']);
        //plan.plansData = selectedPlan.getIn(['plan', 'plansData']).toJS();
        console.dir(plan);
    }

    deletePlan() {
        console.dir(this.props.params.planId);
    }

    render() {
        const {selectedPlan} = this.props;
        return (
            <Row>
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        hideDeleteButton={false}
                        onSubmit={this.updatePlan}
                        onDeleteClick={this.deletePlan}
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
    selectedPlan: PropTypes.object
};

function mapStateToProps(state) {
    return {
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Plan)
