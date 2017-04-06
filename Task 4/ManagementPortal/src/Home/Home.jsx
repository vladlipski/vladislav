import React, {PropTypes} from 'react';
import {AuthorizedComponent} from 'react-router-role-authorization';
import {connect} from "react-redux";


class Home extends AuthorizedComponent {
    constructor(props) {
        super(props);
        this.userRoles =  this.props.user.roles;//['student'];
        this.notAuthorizedPath = '/forbidden';
    }

    render() {
        return (
            <div>
                <h1>Home page!</h1>
            </div>
        );
    }
}

Home.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(Home)
