import React, {Component} from 'react'
import {bindActionCreators, dispatch} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {browserHistory} from 'react-router';
import {logoutUser} from "../Auth/authActions";
import {connect} from "react-redux";

class Header extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated) {
            browserHistory.push('/login');
        }
    }

    logoutClick() {
        this.props.logoutUser();
    }

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
                            <NavItem onClick={() => this.logoutClick()}>Logout</NavItem>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

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