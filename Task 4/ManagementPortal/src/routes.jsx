import React from 'react';
import {IndexRoute, Route}  from 'react-router';
import App from './App';
import Login from './Auth';
import Home from "./Home";

export default (
    <Route component={App} path='/'>
        <IndexRoute authorize={['student', 'mentor', 'admin']} component={Home} />
        <Route component={Login} path='login' />
    </Route>
);
