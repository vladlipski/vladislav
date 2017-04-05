import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Header";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';

class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated) {
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
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps)(App)