# JamesGallagher.io

## Background

This application is my professional portfolio powered by a GraphQL on Rails API and a React Single Page App (SPA). This portfolio has been constructed with a full CMS, allowing for the creation and administration of blog articles, portfolio projects, references, and inquiries through the site.

You can see the Portfolio API here: [jamesgallagher432/portfolio-api](https://github.com/jamesgallagher432/portfolio-api)

## Main Features

### Styled Components

This framework employs both css-modules and styled-components.  We feel that [styled-components](https://github.com/styled-components/styled-components) is the best css-in-js library available.

### Grommet

[Grommet](https://grommet.github.io/) is the world's most advanced UX framework.  It contains hundreds of reusable UI components that you can use right away.

### GraphQL / Apollo

This framework includes some basic setup for GraphQL and ApolloClient.  You will have to setup your own GraphQL Server.  Alternatively, take a look at the [GraphQL Anywhere](https://github.com/apollostack/graphql-anywhere) package (not installed), which would allow you to process GraphQL queries client-side.

The setup includes the ability to generate the boilerplate to create GraphQL / ApolloClient queries and mutations within your containers.  It also adds the eslint-graphql-plugin to lint your collocated GraphQL queries / mutations.  The way it works is to load a schema.json file to create an AST of your GraphQL schema.  You will need to provide your own schema.json file and leave it in the `/config/schema/` folder.

Take a look at the [Example Apps](https://github.com/RyanCCollins/scalable-react-boilerplate#example-apps) section to see examples of GraphQL configuration in practice.

If you do not need to use graphql, take a look at the [sans-apollo](https://github.com/RyanCCollins/scalable-react-boilerplate/tree/sans-apollo) branch for a reference implementation without GraphQL / Apollo.  

# Documentation

## Getting Started

To try the example application out or to use the project, follow the instructions below.

There are two options for installation:

1. **Clone repo**

   `git clone https://github.com/jamesgallagher432/jamesgallagherio.git`

2. **Install dependencies**

   `npm run setup`

3. **Create environment file**
   In order for the server and client to know which urls to connect to, we ask that you make a `.env` file.  We've included a `.env.example` file that you can rename to get started with the default values.

   `cp .env.example .env`

4. **Run development server**

   `npm run start`

   Your app will be served at: http://localhost:5000

## File Structure

Some files left out for brevity.  Please reference the files in the [Scalable React Boilerplate](https://github.com/RyanCCollins/feature-first-react-boilerplate) project for an example of the file structure.  The application will ultimately be in use in a production web application project and more info will be posted here when we have production level examples.

```
.
├── README.md
├── LICENSE
├── index.html
├── package.json
├── webpack.config.js
├── webpack.config.prod.js
├── devServer.js
├── server.js
├── app/
|   ├── fonts
|   ├── images
|   ├── src
|   |   ├── apolloClient.js
|   |   ├── index.js
|   |   ├── routes.js
|   |   ├── store.js
|   |   ├── components
|   |   |   ├── FeatureFirstComponent
|   |   |   |   ├── index.js
|   |   |   |   ├── index.module.scss
|   |   |   |   └── tests
|   |   |   |   |   └── index.test.js
|   |   |   ├── App.jsx
|   |   |   ├── Main.js
|   |   |   └── index.js
|   |   ├── containers
|   |   |   ├── FeatureFirstContainer
|   |   |   |   ├── tests
|   |   |   |   |   ├── actions.test.js
|   |   |   |   |   ├── index.test.js
|   |   |   |   |   └── reducer.test.js
|   |   |   |   ├── actions.js
|   |   |   |   ├── constants.js
|   |   |   |   ├── index.js
|   |   |   |   ├── index.module.scss
|   |   |   |   └── reducer
|   |   |   └── index.js
|   |   ├── pages
|   |   ├── store
|   |   ├── utils
|   |   └── index.js
|   └── styles
├── .eslintignore
├── .eslintrc
├── .gitattributes
└── .gitignore
```

## Technologies / Libraries

- [Node](https://nodejs.org/en/) - JS runtime environment
- [npm](https://www.npmjs.com/) - package manager
- [Babel](https://babeljs.io/) - ES6 transpiler
- [Webpack](https://webpack.github.io/) - module bundler & task runner
- [React](https://facebook.github.io/react/) - interfaces
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) - hot reloading for react
- [react-router](https://github.com/rackt/react-router) - react application router
- [react-redux](https://github.com/rackt/react-redux) - react bindings for redux
- [react-css-modules](https://github.com/gajus/react-css-modules) - React CSS Modules implement automatic mapping of CSS modules.
- [react-foundation](https://github.com/nordsoftware/react-foundation) - Foundation React components, use or don't use.
- [Immutable](https://github.com/facebook/immutable-js) - data structures
- [Redux](https://github.com/rackt/redux) - awesome flux architecture
- [Redux Form](https://github.com/erikras/redux-form)- works with React Redux to enable an html form in React to use Redux to store all of its state.
- [redux-thunk](https://github.com/gaearon/redux-thunk) - thunk middleware for redux
- [Styled Components](https://github.com/styled-components/styled-components) Visual primitives for the component age 💅 http://styled-components.com
- [Apollo Client](https://github.com/apollostack/apollo-client) Collocated GraphQL queries that are intelligently cached.  See [the docs](http://dev.apollodata.com/) and the [configuration file](https://github.com/RyanCCollins/scalable-react-boilerplate/blob/master/app/src/apolloClient.js) to configure in your own project (Note: you will need to connect to a GraphQL Server.  See the [example apps for details](https://github.com/RyanCCollins/scalable-react-boilerplate#example-apps).
- [Graphql](http://graphql.org/)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) - API fetch network requests
- [redux-devtools](https://github.com/gaearon/redux-devtools) - redux development tool
- [SASS](http://sass-lang.com/) - styles
- [ESLint](http://eslint.org/) - linter
- [Mocha](http://mochajs.org/) - unit tests
- [jsdom](https://github.com/tmpvar/jsdom) - vdom to test React without browser
- [Expect](https://github.com/mjackson/expect) - assertion library
- [Enzyme](https://github.com/airbnb/enzyme) - React Testing utils for rendering of components
- [Chai / Immutable](http://chaijs.com/) - assertion library for Immutable JS
- Personal scripts and scripts in the Scalable React Boilerplate

## Authors

- **James Gallagher**

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jamesgallagher432/opencommit-client/blob/master/LICENSE.md) file for details.

## Acknowledgments

Thanks to the Scalable React Boilerplate and the creators of Grommet!
