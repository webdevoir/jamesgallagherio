/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import React from 'react';
import env from 'node-env-file';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { getDataFromTree } from 'react-apollo/server';
import { createNetworkInterface } from 'apollo-client';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import store from '../app/src/store';
import { routes } from '../app/src/routes';
import Html from './utils/Html';
import createApolloClient from './utils/createApolloClient';
import manifest from './public/manifest.json';

env(path.join(__dirname, '..', '.env'));

const app = express();
const serverUrl = process.env.BASE_URL || 'http://localhost:1337';
const apiUrl = 'https://jamesgallagherio-api.herokuapp.com/graphql' || 'http://localhost:3000';
const PORT = process.env.PORT;
const IP = '0.0.0.0';
const graphqlUrl = `${apiUrl}graphql`;
const debug = process.env.DEBUG === 'true';

if (debug) { app.use(morgan('combined')); }
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  match({ routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
        res.status(500);
      } else if (renderProps) {
        const styles = {}
        const location = {}

        const client = createApolloClient({
          ssrMode: true,
          networkInterface: createNetworkInterface({
            uri: apiUrl,
            credentials: 'same-origin',
            headers: req.headers,
          }),
        });
        const component = (
          <ApolloProvider client={client} store={store}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        );
        getDataFromTree(component).then((ctx) => {
          const content = renderToString(component);
          const state = { apollo: ctx.store.getState() };
          const html = (
            <Html
              content={content}
              scriptHash={manifest['/main.js']}
              vendorHash={manifest['/vendor.js']}
              cssHash={manifest['/main.css']}
              styles={styles}
              state={state}
              location={location}
            />
          );
          res.status(200).send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
        }).catch(e => console.error('RENDERING ERROR:', e)); // eslint-disable-line no-console
      } else {
        res.status(404).send('Not found');
      }
    });
});

app.listen(PORT, IP, (err) => {
  if (err) {
    return console.warn(err);
  }
  return console.info(`==> 😎 Listening on port ${PORT}. Open http://${IP}:${PORT} in your browser.`);
});
