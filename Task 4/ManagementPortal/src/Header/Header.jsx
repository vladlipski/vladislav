import React, { Component, PropTypes } from 'react'
import {dispatch} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router";

export default class Header extends Component {

    render() {
        const isAuthenticated = this.props.isAuthenticated;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Students Lab Management Portal
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated &&
                            <LinkContainer to='/logout'>
                                <NavItem>Logout</NavItem>
                            </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};