import React from "react";
import {browserHistory, IndexRoute, Route, Router}  from "react-router";
import App from "./App";
import Login from "./Auth";
import Home from "./Home";
import Forbidden from "./Forbidden";
import DepartmentsList from "./Departament/DepartmentsList";
import UsersList from "./User/UsersList";
import User from "./User";
import UserNew from "./User/UserNew";
import {Role} from "./Auth/roles";


export default (store) => {
    const NOT_AUTHORIZED_PATH = '/forbidden';

    function requireAuth(nextState, replace) {
        const state = store.getState();
        if (!state.auth.user) {
            replace("/login");
        }
    }

    function checkRole(nextState, replace) {
        const state = store.getState();
        if (this.authorize.indexOf(state.auth.user.role) === -1) {
            replace(NOT_AUTHORIZED_PATH);
        }
    }

    function checkAuth(nextState, replace) {
        const state = store.getState();
        if (state.auth.user) {
            replace("/");
        }
    }

    return(
        <Router history={browserHistory}>
            <Route component={App} path='/' onEnter={requireAuth}>
                <IndexRoute authorize={[Role.STUDENT, Role.MENTOR, Role.ADMIN]} component={Home} onEnter={checkRole}/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={UsersList} path='/users' onEnter={checkRole}/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={UserNew} path='/users/new' onEnter={checkRole}/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={User} path='/users/:id' onEnter={checkRole}/>
                <Route authorize={[Role.ADMIN]} component={DepartmentsList} path='/departments' onEnter={checkRole}/>
            </Route>
            <Route component={Login} path='/login' onEnter={checkAuth}/>
            <Route component={Forbidden} path={NOT_AUTHORIZED_PATH} />
        </Router>
    );
}
