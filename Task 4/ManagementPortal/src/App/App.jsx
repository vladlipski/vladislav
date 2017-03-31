import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Header";
import './bootstrap.css';
import {connect} from "react-redux";


class App extends Component {
    // componentWillMount() {
    //     if (!this.props.isAuthenticated) {
    //           this.props.router.push('/login');
    //     }
    // }

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