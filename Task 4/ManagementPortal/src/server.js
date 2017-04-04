import express  from 'express';
import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './getRoutes';
import configureStore from './configureStore';
import {verifyToken} from "./Auth/authService";
var Cookies = require( "cookies" );

const app = express();

app.use((req, res) => {
  const store = configureStore();
  const state = store.getState();

  const cookies = new Cookies(req, res);
  state.auth.isAuthenticated = verifyToken(cookies.get('id_token'));

  match({ routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }


    const componentHTML = ReactDom.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    return res.end(renderHTML(componentHTML));
  });
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Students Lab Management Portal</title>
      <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-h21C2fcDk/eFsW9sC9h0dhokq5pDinLNklTKoxIZRUn3+hvmgQSffLLQ4G4l2eEr" crossorigin="anonymous">
      <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
    </head>
    <body>
      <div id="react-view">${componentHTML}</div>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
    </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
