import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {getUser} from "./userActions";
import {bindActionCreators} from "redux";
import {Alert, Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForms/UserForm";
import {getPlans} from "../Plan/planActions";

class User extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  [this.props.currentUserRole];
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        const userId = this.props.params.id;
        if (userId) {
            this.props.getUser(this.props.currentUserId, userId);
        }
        this.props.getPlans();
    }

    render() {
        const {activeUser, plansList} = this.props;

        if (activeUser.isFetching) {
            return <h1>Loading...</h1>;
        } else if(activeUser.errorMessage) {
            return (
                <Alert bsStyle="danger">
                    {activeUser.errorMessage}
                </Alert>
            )
        } else if(!activeUser.user) {
            return <span />
        }

        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>User: {activeUser.user.username}</PageHeader>
                <UserForm
                    currentUserRole={this.props.currentUserRole}
                    user={activeUser.user}
                    onSubmit={() => {console.log('Submit')}}
                    plans={plansList.plans}
                />
            </Col>
        );
    }
}

User.propTypes = {
    currentUserRole: PropTypes.string,
    currentUserId: PropTypes.number,
    activeUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
        currentUserId: state.auth.user.id,
        activeUser: state.usersManager.activeUser,
        plansList: state.plansManager.plansList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch),
        getPlans: bindActionCreators(getPlans, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
