import React from "react";
import {browserHistory, IndexRoute, Route, Router}  from "react-router";
import App from "./App";
import Login from "./Auth";
import Home from "./Home";
import Forbidden from "./Forbidden";
import DepartmentsList from "./Departament/DepartmentsList";


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
                <IndexRoute authorize={['student', 'mentor', 'admin']} component={Home}/>
                <Route authorize={['admin']} component={DepartmentsList} path='departments'/>
            </Route>
            <Route component={Login} path='/login' onEnter={checkAuth}/>
            <Route component={Forbidden} path="/forbidden" />
        </Router>
    );
}
