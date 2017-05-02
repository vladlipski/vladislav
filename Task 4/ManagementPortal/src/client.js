import React      from 'react';
import ReactDOM   from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import getRoutes from './getRoutes';

const store = configureStore();

const component = (
    <Provider store={store}>
        {getRoutes(store)}
    </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
