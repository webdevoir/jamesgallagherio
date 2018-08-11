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
import Carousel from 'grommet-udacity/components/Carousel';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox, ThumbnailImage, Wrapper } from './styles';
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

    const referencesToRender = this.props.getReferences.getReferences

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
        <Section
          id="references-section"
          className="section"
          colorIndex="light-2"
          full="horizontal"
          align="center"
          justify="center"
        >
          <Headline align="center" className="heading">
            References
          </Headline>
          <Divider />
            <Box className={styles.box} pad="medium">
              {referencesToRender && referencesToRender.length > 0 &&
                <Carousel
                  persistentNav={true}
                  autoplay
                  className={styles.carousel}
                >
                  {referencesToRender.map((reference, i) =>
                    <Box
                      className={`${styles.carouselItem}`}
                      key={i}
                    >
                    <Columns>
                      <Box>
                        <img
                          alt="Reference Image"
                          src={reference.avatar}
                          className={styles.avatar}
                        />
                          <Heading className="heading" align="center">
                            {reference.name}
                          </Heading>
                          <Heading tag="h3" align="center" className={styles.labelText}>
                            {reference.title}
                          </Heading>
                          <Heading tag="h3" align="center" className={styles.labelBottom}>
                            {reference.company}
                          </Heading>
                      </Box>
                      <Box align="center" className={styles.referenceText}>
                        <Paragraph size="medium">
                          {reference.body}
                        </Paragraph>
                      </Box>
                      </Columns>
                    </Box>
                  )}
                </Carousel>
              }
            </Box>
        </Section>
        <Section
          full="horizontal"
          align="center"
          justify="start"
          className={styles.techstackcolor}
        >
          <Headline align="center" className={styles.techStackTitle}>
            Technology Stack
          </Headline>
          <Divider />
          <Tiles align="center" justify="center" fill={true} className={styles.techStackTiles}>
            <Tile basis="1/4">
            <div className={styles.avatarWrapper}>
            <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://cdn-images-1.medium.com/max/1600/1*kt9otqHk14BZIMNruiG0BA.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://cdn-images-1.medium.com/max/1000/1*49DDRZhUWvVnH-QNHuSUSw.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://www.docker.com/sites/default/files/social/docker_facebook_share.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://upload.wikimedia.org/wikipedia/commons/1/16/Ruby_on_Rails-logo.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://cdn-images-1.medium.com/max/2000/1*BpaqVMW2RjQAg9cFHcX1pw.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://brand.heroku.com/static/media/heroku-logotype-horizontal.81c49462.svg"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png"
             />
             </Wrapper>
           </div>
           </Tile>
           <Tile basis="1/4">
           <div className={styles.avatarWrapper}>
           <Wrapper imageSize={`large`}>
             <ThumbnailImage
               src="https://cdn-images-1.medium.com/max/1600/1*gxsXG6AulIYDwAugb6F91g.png"
             />
             </Wrapper>
           </div>
           </Tile>
          </Tiles>
        </Section>
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
