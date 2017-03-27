import React from 'react';
import { Route }  from 'react-router';
import App from 'App';
import Login from "./Login";

export default (
  <Route component={App} path='/'>
      <Route component={Login} path='login' />
  </Route>

);
