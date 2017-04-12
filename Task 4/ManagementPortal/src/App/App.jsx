import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Header from "../Header";
import {Row} from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Grid>
                    <Row>
                        {this.props.children}
                    </Row>
                </Grid>
            </div>
        );
     }
}

App.propTypes = {
    children: PropTypes.node
};

export default App