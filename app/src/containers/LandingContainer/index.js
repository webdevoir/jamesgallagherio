import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Section from 'grommet-udacity/components/Section';
import Box from 'grommet-udacity/components/Box';
import Columns from 'grommet-udacity/components/Columns';
import Markdown from 'grommet-udacity/components/Markdown';
import Heading from 'grommet-udacity/components/Heading';
import Label from 'grommet-udacity/components/Label';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Headline from 'grommet/components/Headline';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Card from 'grommet-udacity/components/Card';
import Meter from 'grommet-udacity/components/Meter';
import Value from 'grommet-udacity/components/Value';
import Button from 'grommet-udacity/components/Button';
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
import { LandingPageHero, LandingPageSummary, LandingPageLanguages, LandingPageWorkExperience, LandingPageMilestones } from "../../components"

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

    return (
      <div>
        <LandingPageHero />
        <LandingPageSummary />
        <LandingPageLanguages />
        <LandingPageWorkExperience />
        <LandingPageMilestones />
      </div>
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
