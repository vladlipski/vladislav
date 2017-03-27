import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from 'react-router';

import './bootstrap.css';
import { Nav, NavItem } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const propTypes = {
  children: PropTypes.node
};

class App extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>Students Lab Management Portal</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to='/login'>
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
