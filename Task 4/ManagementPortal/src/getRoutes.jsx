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
    function requireAuth(nextState, replace) {
        const state = store.getState();
        if (!state.auth.user) {
            replace("/login");
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
                <IndexRoute authorize={[Role.STUDENT, Role.MENTOR, Role.ADMIN]} component={Home}/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={UsersList} path='users'/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={UserNew} path='users/new'/>
                <Route authorize={[Role.MENTOR, Role.ADMIN]} component={User} path='users/:id'/>
                <Route authorize={[Role.ADMIN]} component={DepartmentsList} path='departments'/>
            </Route>
            <Route component={Login} path='/login' onEnter={checkAuth}/>
            <Route component={Forbidden} path="/forbidden" />
        </Router>
    );
}
