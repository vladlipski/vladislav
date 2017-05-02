import React from "react";
import {browserHistory, IndexRoute, Route, Router}  from "react-router";
import App from "./App";
import Login from "./Auth";
import Home from "./Home";
import Forbidden from "./Shared/ErrorPages/Forbidden";
import DepartmentsList from "./Departament/DepartmentsList";
import UsersList from "./User/UsersList";
import User from "./User";
import UserNew from "./User/UserNew";
import {Role} from "./Auth/roles";
import Department from "./Departament";
import DepartmentNew from "./Departament/DepartmentNew";
import PlansList from "./Plan/PlansList";


export default (store) => {
    const NOT_AUTHORIZED_PATH = '/forbidden';

    function requireAuth(nextState, replace) {
        const state = store.getState();

        if (!state.getIn(['auth', 'user'])) {
            replace("/login");
        }
    }

    function checkRole(nextState, replace) {
        const state = store.getState();
        if (this.authorize.indexOf(state.getIn(['auth', 'user', 'role'])) === -1) {
            replace(NOT_AUTHORIZED_PATH);
        }
    }

    function checkAuth(nextState, replace) {
        const state = store.getState();
        if (state.getIn(['auth', 'user'])) {
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
                <Route authorize={[Role.ADMIN]} component={DepartmentNew} path='/departments/new' onEnter={checkRole}/>
                <Route authorize={[Role.ADMIN]} component={Department} path='/departments/:id' onEnter={checkRole}/>
                <Route authorize={[Role.ADMIN, Role.MENTOR]} component={PlansList} path='/plans' onEnter={checkRole}/>
            </Route>
            <Route component={Login} path='/login' onEnter={checkAuth}/>
            <Route component={Forbidden} path={NOT_AUTHORIZED_PATH} />
        </Router>
    );
}
