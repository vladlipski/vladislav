import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from "redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {logoutUser} from "../../../Auth/authActions";
import {connect} from "react-redux";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";
import {browserHistory} from 'react-router';


class Header extends Component {
    logoutClick() {
        this.props.logoutUser();
        browserHistory.push('/login');
    }

    checkAccessToRoute(role, routePath) {
        const allRoutes = this.props.routes;
        const route = allRoutes.find(route => route.path === routePath);
        return route && route.authorize.indexOf(role) !== -1
    }

    render() {
        const {user} = this.props;
        const userRole = user.get('role');

        const paths = {
            users: '/users',
            departments: '/departments',
            plans: '/plans'
        };

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
                    {user && this.checkAccessToRoute(userRole, paths.users) &&
                        <LinkContainer to={paths.users}>
                            <NavItem>Users</NavItem>
                        </LinkContainer>
                    }
                    {user && this.checkAccessToRoute(userRole, paths.departments) &&
                        <LinkContainer to={paths.departments}>
                            <NavItem>Departments</NavItem>
                        </LinkContainer>
                    }
                    {user && this.checkAccessToRoute(userRole, paths.plans) &&
                        <LinkContainer to={paths.plans}>
                            <NavItem>Plans</NavItem>
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
    user: PropTypes.object,
    routes: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.getIn(['auth', 'user'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header)