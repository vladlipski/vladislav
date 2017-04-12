import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {getUser} from "./userActions";
import {bindActionCreators} from "redux";
import {Col, PageHeader} from "react-bootstrap";
import UserForm from "./UserForms/UserForm";

class UserNew extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  [this.props.currentUserRole];
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        //this.props.getUser(this.props.currentUserId, this.props.params.id);
    }

    render() {
        return (
            <Col smOffset={2} sm={7}>
                <PageHeader>New user</PageHeader>
                <UserForm
                    currentUserRole={this.props.currentUserRole}
                    user={{}}
                    onSubmit={() => {console.log('Submit new')}}
                />
            </Col>
        );
    }
}

UserNew.propTypes = {
    currentUserRole: PropTypes.string,
    currentUserId: PropTypes.number,
    onSubmit: PropTypes.func
};

function mapStateToProps(state) {
    return {
        currentUserRole: state.auth.user.role,
        currentUserId: state.auth.user.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew)
