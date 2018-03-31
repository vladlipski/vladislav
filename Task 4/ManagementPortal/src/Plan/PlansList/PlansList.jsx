import React, {PropTypes, Component} from 'react'
import {connect} from "react-redux";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {getAllPlans, getPlansByAuthor} from "../planActions";
import PlansTable from "./PlansTable";
import {Role} from "../../Auth/roles";
import {LinkContainer} from "react-router-bootstrap";


class PlansList extends Component {
    componentWillMount() {
        if (Role.isAdmin(this.props.currentUserRole)) {
            this.props.getAllPlans();
        } else {
            this.props.getPlansByAuthor(this.props.currentUserId);
        }
    }

    render() {
        const plansList = this.props.plansList;

        if (plansList.get('isFetching')) {
            return <h1>Loading...</h1>;
        } else if(plansList.get('errorMessage')) {
            return (
                <Alert bsStyle="danger">
                    {plansList.get('errorMessage')}
                </Alert>
            )
        }

        return (
            <Col smOffset={2} sm={7}>
                <Row>
                    <LinkContainer to="plans/new">
                        <Button>
                            Add plan
                        </Button>
                    </LinkContainer>
                </Row>
                <br/>
                <Row>
                    <PlansTable
                        plans={plansList.get('plans').toJS()}
                    />
                </Row>
            </Col>
        )
    }
}

PlansList.propTypes = {
    plansList: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.getIn(['auth', 'user', 'role']),
        currentUserId: state.getIn(['auth', 'user', 'id']),
        plansList: state.getIn(['plansManager', 'plansList'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPlans: bindActionCreators(getAllPlans, dispatch),
        getPlansByAuthor: bindActionCreators(getPlansByAuthor, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansList)