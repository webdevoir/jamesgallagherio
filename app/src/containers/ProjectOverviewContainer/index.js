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
import OverviewIcon from 'grommet/components/icons/base/Overview';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
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
import RichTextEditor from 'react-rte';

// eslint-disable-next-line react/prefer-stateless-function
class ProjectOverviewContainer extends Component {
  render() {
    if (this.props.getProjects && this.props.getProjects.loading) {
      return (<div>
        <MainBox
        alignContent="center"
        fill="horizontal"
        align="center"
        >
          <FullSection primary direction="row">
            <Section
            align="center"
            justify="center"
            className="loading__box"
            >
             <LoadingIndicator isLoading />
           </Section>
          </FullSection>
        </MainBox>
        </div> )
    }

    if (this.props.getProjects && this.props.getProjects.error) {
      return <div>Error</div>
    }
    const project = this.props.getProject.getProject[0]

    return (
      <Section
        primary
        pad={{ horizontal: 'large' }}
        align="center"
        justify="center"
        className={styles.login}
      >
        <Heading align="center" className="heading">
          {project.title}
        </Heading>
        <Heading align="center" tag="h2" className="heading">
          {project.category}
        </Heading>
        <Divider />
        <Image src='/img/carousel-1.png'
        size='large'
        align="center"
        caption={project.caption} />
        <Menu inline direction="row" responsive={false}>
          {project.repo_url &&
            <Button icon={<SocialGithubIcon />}
            label='View Repo'
            href={project.repo_url} />
          }
          {project.project_url &&
            <Button icon={<OverviewIcon />}
            label='View Project'
            href={project.project_url} />
          }
        </Menu>
        <Heading align="center" className="heading">
          Project Description
        </Heading>
        <Box
            size="large"
            className={styles.loginFormWrapper}
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <Box
              className={styles.loginForm}
              pad={{ horizontal: 'large' }}
            >
            <Markdown content={project.description} />
          </Box>
        </Box>
        <Heading align="center" className="heading">
          Milestones
        </Heading>
        <Box
            size="large"
            className={styles.loginFormWrapper}
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <Box
              className={styles.loginForm}
              pad={{ horizontal: 'large' }}
            >
            <Markdown content={project.milestones} />
          </Box>
        </Box>
        <Heading align="center" className="heading">
          Technical Info
        </Heading>
        <Box
            size="large"
            className={styles.loginFormWrapper}
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <Box
              className={styles.loginForm}
              pad={{ horizontal: 'large' }}
            >
            <Markdown content={project.technical_information} />
          </Box>
        </Box>
        <Heading align="center" className="heading">
          Technical Info
        </Heading>
        <Box
            size="large"
            className={styles.loginFormWrapper}
            align="center"
            pad={{ horizontal: 'small', vertical: 'small' }}
          >
            <Box
              className={styles.loginForm}
              pad={{ horizontal: 'large' }}
            >
            {project.tags.map(tag => {
              <Button
              label={tag.title}
              href='#' />
            })}
          </Box>
        </Box>
        <Heading align="center" className="heading">
          Project Images
        </Heading>
        <Columns
          maxCount={4}
          align="center"
          justify="center"
        >
        {project.project_images.map((image) => {
          <Card>
            <Box align="center" justify="center">
              <Image src={image.image_url}/>
            </Box>
          </Card>
        })}
      </Section>
    );
  }

}

const FEED_PROJECT = gql`
  query GetProject(project_id: Int!) {
    getProject(project_id: $project_id) {
      id
      title
      slug
      status
      description
      caption
      milestones
      repo_url
      category
      created_at
      updated_at
      feature_image
      project_url
      technical_information
      comments {
        body
        project_id
        upvote_count
        created_at
        user_id
        user {
          id
          name
          profile_picture
        }
      }
      project_images {
        image_url
      }
      tags {
        title
      }
    }
  }
`;

export default compose(
graphql(FEED_PROJECT, { name: 'getProject', options: (props) => ({variables: { project_id: this.props.id } })})) (TeamOverviewContainer);
