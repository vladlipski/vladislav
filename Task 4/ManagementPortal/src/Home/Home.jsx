import React, {PropTypes, Component} from 'react';
import {connect} from "react-redux";


class Home extends Component {
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
