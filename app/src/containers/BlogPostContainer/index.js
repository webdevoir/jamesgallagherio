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
class BlogPostContainer extends Component {
  render() {
    if (this.props.getPost && this.props.getPost.loading) {
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

    if (this.props.getPost && this.props.getPost.error) {
      return <div>Error</div>
    }

    if (this.props.getPostTags && this.props.getPostTags.loading) {
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

    if (this.props.getPostTags && this.props.getPostTags.error) {
      return <div>Error</div>
    }

    const post = this.props.getPost.getPost[0]
    const tagsToRender = this.props.getPostTags.getPostTags
    return (
      <div>
      <Hero background={<Image src={post.feature_image}
        fit='cover'
        full={true} />}
        backgroundColorIndex='dark'>
        <Box direction='row'
          justify='center'
          align='center'>
          <Box basis='1/2'
            align='end'
            pad='medium' />
          <Box basis='1/2'
            align='start'
            pad='medium'>
            <Box colorIndex='grey-2-a'>
              <Card heading={post.title} />
            </Box>
          </Box>
        </Box>
      </Hero>
      <Box align="center">
        <Article align="center" className="panel" pad="large">
          {typeof readme === 'string' &&
            <Markdown content={post.body} />
          }
        </Article>
      </Box>
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
          {tagsToRender.map(tag =>
            <Button
            label={tag.title}
            href='#' />
          )}
          </Box>
        </Article>
      </Section>
      <CommentComponent slug={this.props.params.slug} status={`Project`} />
      </div>
    );
  }
}

BlogPostContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};


const FEED_POST = gql`
  query GetPost($slug: String) {
    getPost(slug: $slug) {
      id
      title
      slug
      status
      body
      description
      category
      feature_image
    }
  }
`;

const FEED_POST_TAGS = gql`
  query GetPostTags($slug: String, $status: String) {
    getPostTags(slug: $slug, status: $status) {
      id
      title
    }
  }
`;

export default compose(
  graphql(FEED_POST, { name: 'getProject', options: (props) => ( {variables: { slug: props.params.slug, status: "Post" } })}),
  graphql(FEED_POST_TAGS, { name: 'getProjectTags', options: (props) => ( {variables: { slug: props.params.slug, status: "Post" } })}))(BlogPostContainer);
