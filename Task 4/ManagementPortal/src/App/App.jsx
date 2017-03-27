import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';

import './bootstrap.css';
import {connect} from "react-redux";
import Header from "../Header";

class App extends Component {
    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;
        return (
            <div>
                <Header
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}>
                </Header>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
    );
  }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(App)
