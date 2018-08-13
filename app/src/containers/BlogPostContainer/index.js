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
import Tags from 'grommet-udacity/components/Tags';
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
        <LoadingIndicator isLoading />
        </div> )
    }

    if (this.props.getPost && this.props.getPost.error) {
      return <div>Error</div>
    }

    if (this.props.getPostTags && this.props.getPostTags.loading) {
      return (<div>
        <LoadingIndicator isLoading />
        </div> )
    }

    if (this.props.getPostTags && this.props.getPostTags.error) {
      return <div>Error</div>
    }

    const post = this.props.getPost.getPost[0]
    const tagsToRender = this.props.getPostTags.getPostTags
    return (
      <div className={styles.page}>
      <Hero
        backgroundImage={post.feature_image}
        size='large'
      >
        <Box colorIndex="grey-1-a" pad="large" style={{ width: '100%' }}>
          <Headline className={styles.headline}>
            {post.title}
            <Label>
              <br /> By {post.user.name}
             </Label>
          </Headline>
        </Box>
      </Hero>
      <Section
      className="container"
      primary
      >
          <Article align="center"
            justify="center"
            className="panel">
              <Markdown
              components={{
                h1: { props: { strong: true } },
                h2: { props: { strong: true } },
                p: { props: { size: 'large' } },
                img: { props: { size: 'small' } },
              }}
              content={post.body}
            />
          </Article>
        </Section>
        <Section>
          <Box className="container">
            <Article className="panel markdown-body-blog" align="center">
              <Heading align="center">
                Tags
              </Heading>
              <Divider />
              <Tags align="center" justify="center" style={{ maxWidth: '80%' }}>
                {tagsToRender.map(tag =>
                  <Button
                  className={styles.buttonComponent}
                  label={tag.title}
                  href={`/blog/archive?tag=${tag.title}`} />
                )}
              </Tags>
            </Article>
          </Box>
        </Section>
        <Section
          primary
          pad={{ horizontal: 'large' }}
          align="center"
          justify="center"
        >
          <CommentComponent slug={this.props.params.slug} status="Post" />
        </Section>
      </div>
    );
  }

  _createComment = async function() {
    const body = this.state.value
    const slug = this.state.slug
    const status = this.state.status
    this.setState({ body_field: "" })
    await this.props.createComment({
      variables: {
        body,
        slug,
        status
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ body_field: "" })
      this.toggleCommentCreated();
    }
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
      user {
        name
      }
    }
  }
`;

const FEED_POST_TAGS = gql`
  query GetPostTags($slug: String) {
    getPostTags(slug: $slug) {
      id
      title
    }
  }
`;

export default compose(
  graphql(FEED_POST, { name: 'getPost', options: (props) => ( {variables: { slug: props.params.slug } })}),
  graphql(FEED_POST_TAGS, { name: 'getPostTags', options: (props) => ( {variables: { slug: props.params.slug } })}))(BlogPostContainer);
