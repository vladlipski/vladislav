import React, {PropTypes, Component} from 'react'
import TreeView from "./TreeView";
import {Alert, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPlan} from "./planActions";


class Plan extends Component {

    componentWillMount() {
        const planId = this.props.params.planId;
        if (planId) {
            this.props.getPlan(this.props.currentUserId, planId);
        }
    }

    render() {

        const selectedPlan = this.props.selectedPlan;

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
                    />
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
    // updatedDepartment: PropTypes.object,
    // deletedDepartment: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserId:  state.getIn(['auth', 'user', 'id']),
        selectedPlan:  state.getIn(['plansManager', 'selectedPlan'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlan: bindActionCreators(getPlan, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)
