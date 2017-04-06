import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Header";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';

class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.user) {
            browserHistory.push('/login');
        }
    }
    
    render() {
        return (
            <div>
                <Header/>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
     }
}

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}


export default connect(mapStateToProps)(App)