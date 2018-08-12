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
import Anchor from 'grommet-udacity/components/Anchor';
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

class ProjectsContainer extends Component {
  render() {
    if (this.props.getProjects && this.props.getProjects.loading) {
      return (<div>
        <LoadingIndicator isLoading />
        </div> )
    }

    if (this.props.getProjects && this.props.getProjects.error) {
      return <div>Error</div>
    }

    const projectsToRender = this.props.getProjects.getProjects

    return (
      <div>
      <br />
      <br />
      <Heading align="center" tag="h2">
        Portfolio
      </Heading>
      <Divider />
      <Section className={styles.innerBox}>
          {projectsToRender && projectsToRender.length > 0 &&
            <Columns
              className={styles.masonry}
              masonry
              justify="center"
              size="small"
              maxCount={3}
            >
            <Box className={styles.box} pad="medium" align="center">
                {projectsToRender.map(project =>
                    <Box className={styles.wrapper} key={project.id}>
                      <Box className={styles.card}>
                        <Anchor path={`/projects/${project.slug}`}>
                          <Image
                            src={project.feature_image}
                            className={styles.image}
                          />
                          <div className={styles.overlay}>
                            <p>{project.title}</p>
                          </div>
                          </Anchor>
                        </Box>
                      </Box>
                    )
                  }
            </Box>
        </Columns>
      }
      </Section>
      {!projectsToRender &&
        <Box className={styles.box} pad="medium">
          <Heading align="center" tag="h2">
            Portfolio
          </Heading>
          <Divider />
          <Paragraph align="center" pad="medium" className={styles.main_text}>
            No projects are available at this time.
          </Paragraph>
        </Box>
      }
      </div>
    );
  }

}

const FEED_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      title
      slug
      feature_image
    }
  }
`;

export default withRouter(compose(
  graphql(FEED_PROJECTS, { name: 'getProjects' }))(ProjectsContainer));
