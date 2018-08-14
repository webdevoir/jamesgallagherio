/* global System b:true */
import React from 'react';
import { Router } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import store, { history } from './store';
import client from './apolloClient';
import { AppContainer } from 'containers'; // eslint-disable-line

/* eslint-disable */
// Polyfill for the System.import
if (typeof System === 'undefined') {
  var System = {
    import(path) {
      return Promise.resolve(require(path));
    },
  };
}
/* eslint-enable */

// Switching to system.import to make use of dynamic tree shaking
// https://medium.com/modus-create-front-end-development/automatic-code-splitting-for-react-router-w-es6-imports-a0abdaa491e9#.msrxv8fwd
const errorLoading = err =>
  console.error('Dynamic loading failed' + err); // eslint-disable-line

const loadRoute = cb =>
  module =>
    cb(null, module.default);

export const routes = {
  component: AppContainer,
  path: '/',
  indexRoute: {
    getComponent(location, callback) {
      System.import('./pages/LandingPage') // eslint-disable-line block-scoped-var
        .then(loadRoute(callback))
        .catch(err => errorLoading(err));
    },
  },
  childRoutes: [
    {
      path: '/about',
      getComponent(location, callback) {
        System.import('./pages/AboutPage') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/projects',
      getComponent(location, callback) {
        System.import('./pages/Projects')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/contact',
      getComponent(location, callback) {
        System.import('./pages/ContactPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/login',
      getComponent(location, callback) {
        System.import('./pages/LoginPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/register',
      getComponent(location, callback) {
        System.import('./pages/RegisterPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },

    {
      path: '/reset',
      getComponent(location, callback) {
        System.import('./pages/ResetPassword')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/projects/:slug',
      getComponent(location, callback) {
        System.import('./pages/ProjectOverviewPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/admin/projects/new',
      getComponent(location, callback) {
        System.import('./pages/CreateProject')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/admin/dashboard',
      getComponent(location, callback) {
        System.import('./pages/AdminDashboard')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/blog',
      getComponent(location, callback) {
        System.import('./pages/BlogPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/blog/:slug',
      getComponent(location, callback) {
        System.import('./pages/BlogPost')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/admin/posts/new',
      getComponent(location, callback) {
        System.import('./pages/CreateBlogPostPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/account/profile',
      getComponent(location, callback) {
        System.import('./pages/ProfilePage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/blog/archive',
      getComponent(location, callback) {
        System.import('./pages/BlogPostArchive')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
    {
      path: '/search',
      getComponent(location, callback) {
        System.import('./pages/SearchPage')  // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
/* GENERATOR: Newly generated Routes go here */
    {
      path: '*',
      getComponent(location, callback) {
        System.import('./pages/NotFoundPage') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err));
      },
    },
  ],
};

const RouterApp = props => (
  <ApolloProvider {...props} store={store} client={client}>
    <Router
      history={history}
      routes={routes}
    />
  </ApolloProvider>
);

export default RouterApp;
