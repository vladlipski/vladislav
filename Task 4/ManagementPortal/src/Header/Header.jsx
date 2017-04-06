import React, {Component, PropTypes} from 'react'
import {bindActionCreators, dispatch} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {logoutUser} from "../Auth/authActions";
import {connect} from "react-redux";

class Header extends Component {
    logoutClick() {
        this.props.logoutUser();
    }

    render() {
        const user = this.props.user;

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
                        {user &&
                            <NavItem onClick={() => this.logoutClick()}>Logout</NavItem>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)