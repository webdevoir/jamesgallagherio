import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Section from 'grommet-udacity/components/Section';
import Box from 'grommet-udacity/components/Box';
import Markdown from 'grommet-udacity/components/Markdown';
import Heading from 'grommet-udacity/components/Heading';
import Label from 'grommet-udacity/components/Label';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox } from './styles';
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator } from 'components';
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import fetch from "unfetch";

class LandingContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLoadingOfRepositories = this.handleLoadingOfRepositories.bind(this);
  }

  state = {
    reposToRender: ""
  }

  handleLoadingOfRepositories() {
      var REPOS_QUERY = `
      {
        owner(login: "jamesgallagher432") {
          name
          repositories(first: 30) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                name
              }
            }
          }
        }
      }
      `

    if (this.state.reposToRender == "") {
    const axiosGitHubGraphQL = axios.create({
        baseURL: 'https://api.github.com/graphql'
      });
        axiosGitHubGraphQL
           .post('https://api.github.com/graphql', { query: REPOS_QUERY })
           .then(result =>
           this.setState(() => ({
             reposToRender: result.data.data.viewer.repositories.edges
           }))
           ).catch(error => {
             this.setState({ reposToRender: null })
           });
      }
    }


  render() {

    const currentReferences = this.props.getReferences.getReferences

    if (this.state.reposToRender == "") {
      this.handleLoadingOfRepositories();
    }

    const reposToRender = this.state.reposToRender
    const summary = "
    I am James Gallagher, a React Web Developer specializing in the implementation of powerful web technologies in order to deliver a user-orientated expereince. I have a proven track record of communication skills, problem solving skills, and fluency in React, Ruby on Rails, and React.
    I am currently working on a number of freelance projects, and looking for a full-time position in React Web Development.
    "

    return (
      <Section
        id="summary-section"
        full="horizontal"
        className="half-section gradient-green"
        align="center"
        justify="center"
      >
        <Heading align="center" tag="h2" className="heading">
          About Me
        </Heading>
        <Divider />
        <Box align="center">
          <img
            alt="James Gallagher"
            src="https://github.com/RyanCCollins/cdn/blob/master/misc/me-new.png?raw=true"
            className={styles.avatar}
          />
          <Heading className="heading">
            James Gallagher
          </Heading>
          <Label uppercase className={styles.labelText}>
            React Web Developer
          </Label>
          <hr className={styles.seperator} />
        </Box>
        <Box align="center" justify="center" className={styles.innerContainer}>
          <Box className="main-text">
            <Markdown content={summary} className="paragraph" />
          </Box>
        </Box>
      </Section>
    );
  }

}

const FEED_REFERENCES = gql`
  query GetReferences {
    getReferences {
      id
      title
      name
      avatar
      body
      company
    }
  }
`;

export default withRouter(compose(
  graphql(FEED_REFERENCES, { name: 'getReferences' }))(LandingContainer));
