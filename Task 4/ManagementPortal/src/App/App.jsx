import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Shared/Layout/Header";
import {Col} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div>
                <Header
                    routes={this.props.route.childRoutes}
                />
                <Grid>
                    <Col smOffset={2} sm={7}>
                        {this.props.children}
                    </Col>
                </Grid>
            </div>
        );
     }
}

App.propTypes = {
    children: PropTypes.node
};

export default App