import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Alert, Col, PageHeader, Row} from "react-bootstrap";
import CrudForm from "../Shared/Components/CrudForm";
import PlanForm from "./PlanForm";
import {Role} from "../Auth/roles";
import {bindActionCreators} from "redux";
import {browserHistory} from 'react-router';
import {requestPlanCreation, resetNewPlan} from "./planActions";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.createPlan = this.createPlan.bind(this);
    }

    componentWillMount() {
        this.props.resetNewPlan();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPlan.get('success')) {
            browserHistory.push('/plans/' + nextProps.newPlan.getIn(['plan', 'id']));
        }
    }

    createPlan(plan) {
        const currentUser = this.props.currentUser;
        if (Role.isMentor(currentUser.get('role'))) {
            plan.author =  currentUser.get('id');
        }
        this.props.createPlan(plan);
    }


    render() {
        const errorMessage = this.props.newPlan.get('errorMessage');

        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>New plan</PageHeader>
                {errorMessage &&
                    <Row>
                        <Alert bsStyle="danger">
                            {errorMessage}
                        </Alert>
                    </Row>
                }
                <Col smOffset={2} sm={8}>
                    <CrudForm
                        hideDeleteButton={true}
                        onSubmit={this.createPlan}
                    >
                        <PlanForm />
                    </CrudForm>
                </Col>
            </Col>
        );
    }
}

Plan.propTypes = {
    newPlan: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUser:  state.getIn(['auth', 'user']),
        newPlan:  state.getIn(['plansManager', 'newPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPlan: bindActionCreators(requestPlanCreation, dispatch),
        resetNewPlan: bindActionCreators(resetNewPlan, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Plan)
