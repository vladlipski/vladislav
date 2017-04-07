import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {logoutUser} from "../Auth/authActions";
import {connect} from "react-redux";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";
import {browserHistory} from 'react-router';

class Header extends Component {
    logoutClick() {
        this.props.logoutUser();
        browserHistory.push('/login');
    }

    render() {
        const user = this.props.user;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Students Lab Management Portal
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav
                    activeHref="active"
                >
                    <IndexLinkContainer to="/">
                        <NavItem>Home</NavItem>
                    </IndexLinkContainer>
                    {user && user.roles.find((role) => role === 'admin' || role === 'mentor') &&
                        <LinkContainer to="/users">
                            <NavItem>Users</NavItem>
                        </LinkContainer>
                    }
                    {user && user.roles.find((role) => role === 'admin') &&
                        <LinkContainer to="/departments">
                            <NavItem>Departments</NavItem>
                        </LinkContainer>
                    }
                </Nav>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header)