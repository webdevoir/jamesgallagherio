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
import Article from 'grommet/components/Article';
import Accordion from 'grommet/components/Accordion';
import Footer from 'grommet/components/Footer';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Card from 'grommet-udacity/components/Card';
import Menu from 'grommet-udacity/components/Menu';
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
import { Divider, LoadingIndicator, CommentComponent } from 'components';
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import fetch from "unfetch";
import RichTextEditor from 'react-rte';

// eslint-disable-next-line react/prefer-stateless-function
class ProjectOverviewContainer extends Component {
  render() {
    if (this.props.getProject && this.props.getProject.loading) {
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

    if (this.props.getProject && this.props.getProject.error) {
      return <div>Error</div>
    }

    if (this.props.getProjectImages && this.props.getProjectImages.loading) {
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

    if (this.props.getProjectImages && this.props.getProjectImages.error) {
      return <div>Error</div>
    }

    if (this.props.getProjectTags && this.props.getProjectTags.loading) {
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

    if (this.props.getProjectTags && this.props.getProjectTags.error) {
      return <div>Error</div>
    }

    const project = this.props.getProject.getProject[0]
    const projectimagesToRender = this.props.getProjectImages.getProjectImages
    const tagsToRender = this.props.getProjectTags.getProjectTags

    return (
      <Section
        primary
        pad={{ horizontal: 'large' }}
        align="center"
        justify="center"
        className={styles.login}
      >
        <br />
        <br />
        <Heading align="center">
          {project.title}
        </Heading>
        <Heading align="center" tag="h4">
          {project.caption}
        </Heading>
        <Divider />
        <Image src={project.feature_image}
        size='large'
        align="center"/>
        <Section
          primary
          className={styles.container}
        >
          <Article className={styles.panel}>
            <Heading align="center" className="heading">
              Project Description
            </Heading>
            <Divider />
            <Box pad="medium" align="center" className="main-text markdown-body">
              <Markdown content={project.description} />
            </Box>
            <Footer align="center" justify="center">
              <Menu inline direction="row" responsive={false}>
                {project.repo_url &&
                  <Button icon={<SocialGithubIcon />}
                  label='View Repo'
                  href={project.repo_url} />
                }
                {project.project_url &&
                  <Button icon={<OverviewIcon />}
                  label='View Project'
                  href={project.project_url}
                  className={styles.button} />
                }
              </Menu>
            </Footer>
          </Article>
        </Section>
        <Section
          primary
          className={styles.container}
        >
          <Article className={styles.panel}>
            <Heading align="center" className="heading">
              Milestones
            </Heading>
            <Divider />
            <Box pad="medium" align="center" className="main-text markdown-body">
              <Markdown content={project.milestones} />
            </Box>
          </Article>
        </Section>
        <Section
          primary
          className={styles.container}
        >
          <Article className={styles.panel}>
            <Heading align="center" className="heading">
              Technical Info
            </Heading>
            <Divider />
            <Box pad="medium" align="center" className="main-text markdown-body">
              <Markdown content={project.description} />
            </Box>
          </Article>
        </Section>
        <Section
          primary
          className={styles.container}
        >
          <Article className={styles.panel}>
            <Heading align="center" className="heading">
              Tags
            </Heading>
            <Divider />
            <Box pad="medium" align="center" className="main-text markdown-body">
            {tagsToRender.map(tag => {
              <Button
              label={tag.title}
              href='#' />
            })}
            </Box>
          </Article>
        </Section>
        <Heading align="center" className="heading">
          Project Images
        </Heading>
        <Divider />
        <Columns
          maxCount={4}
          align="center"
          justify="center"
        >
        {projectimagesToRender.map((image) => {
          <Card>
            <Box align="center" justify="center">
              <Image src={image.image_url}/>
            </Box>
          </Card>
        })}
        </Columns>
        <CommentComponent />
      </Section>
    );
  }
}

const FEED_PROJECT = gql`
  query GetProject($slug: String) {
    getProject(slug: $slug) {
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
    }
  }
`;

const FEED_PROJECT_IMAGES = gql`
  query GetProjectImages($slug: String) {
    getProjectImages(slug: $slug) {
      id
      image_url
    }
  }
`;

const FEED_PROJECT_TAGS = gql`
  query GetProjectTags($slug: String) {
    getProjectTags(slug: $slug) {
      id
      title
    }
  }
`;

export default compose(
  graphql(FEED_PROJECT, { name: 'getProject', options: (props) => ( {variables: { slug: props.params.slug } })}),
  graphql(FEED_PROJECT_IMAGES, { name: 'getProjectImages', options: (props) => ( {variables: { slug: props.params.slug } })}),
  graphql(FEED_PROJECT_TAGS, { name: 'getProjectTags', options: (props) => ( {variables: { slug: props.params.slug } })}))(ProjectOverviewContainer);
