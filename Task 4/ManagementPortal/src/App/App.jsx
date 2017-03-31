import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Header";
import './bootstrap.css';


class App extends Component {
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
    children: PropTypes.node
};

export default App
