import React, { Component, PropTypes } from 'react'
import {bindActionCreators, dispatch} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {logoutUser} from "../Auth/authActions";
import {connect} from "react-redux";

class Header extends Component {

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

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)