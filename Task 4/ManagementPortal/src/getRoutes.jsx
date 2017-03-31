import React from 'react';
import {browserHistory, IndexRoute, Route, Router}  from 'react-router';
import App from './App';
import Login from './Auth';
import Home from "./Home";
import Forbidden from "./Forbidden";




export default (store) => {
    function requireAuth(nextState, replace) {
        const state = store.getState();

        if (!state.auth.isAuthenticated) {
            replace("/login");
        }
    }

    return(
        <Router history={browserHistory}>
            <Route component={App} path='/' onEnter={requireAuth}>
                <IndexRoute component={Home}/>
            </Route>
            <Route component={Login} path='/login'/>
            <Route component={Forbidden} path="/forbidden" />
        </Router>
    );
}
