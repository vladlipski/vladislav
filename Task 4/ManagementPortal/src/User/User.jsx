import React, {PropTypes} from 'react'
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";
import {getUser} from "./userActions";
import {bindActionCreators} from "redux";

class User extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.currentUserRoles;
        this.notAuthorizedPath = '/forbidden';
    }

    componentWillMount() {
        super.componentWillMount();
        this.props.getUser(this.props.params.id);
    }

    render() {
        const activeUser = this.props.activeUser;

        if (activeUser.isFetching) {
            return <h1>Loading...</h1>;
        } else if(activeUser.errorMessage) {
            return  <div className="alert alert-danger">{activeUser.errorMessage}</div>
        } else if(!activeUser.user) {
            return <span />
        }
        return (
            <h1>User {activeUser.user.username}</h1>
        );
    }
}

User.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        currentUserRoles: state.auth.user.roles,
        currentUserId: state.auth.user.id,
        activeUser: state.usersManager.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
