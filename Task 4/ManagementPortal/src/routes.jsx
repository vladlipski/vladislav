import React from 'react';
import {Route}  from 'react-router';
import App from './App';
import Login from './Auth';

export default (
    <Route authorize={['student', 'mentor', 'admin']} component={App} path='/'>
        <Route component={Login} path='login' />
    </Route>
);
