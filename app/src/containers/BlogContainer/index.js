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
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
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

class BlogContainer extends Component {
  render() {
    if (this.props.getPosts && this.props.getPosts.loading) {
      return (<div>
        <LoadingIndicator isLoading />
        </div> )
    }

    if (this.props.getPosts && this.props.getPosts.error) {
      return <div>Error</div>
    }

    const postsToRender = this.props.getPosts.getPosts

    return (
      <div>
              <Headline className="heading" align="center">
                Blog
              </Headline>
              <Divider />
              {postsToRender && postsToRender.length > 0 ?
                <Section primary className={styles.innerBox} align="center">
                  <Columns
                    className={styles.columns}
                    masonry
                    maxCount={2}
                    align="center"
                    justify="center"
                    size="large"
                  >
                  {postsToRender.map((post) =>
                    <Box pad="large">
                      <Card thumbnail={post.feature_image}
                      label={post.user.name}
                      heading={post.title}
                      description={post.description}
                      link={<Anchor href={`/blog/${post.slug}`}
                      icon={<LinkNextIcon />}
                      label='Read more' />}
                      contentPad='small'
                      textSize='medium' />
                    </Box>
                      )
                    }
                  </Columns>
                </Section>
              :
                <Section align="center" justify="center" pad="large">
                  <Heading align="center">
                    No posts found
                  </Heading>
                </Section>
              }
      </div>
    );
  }

}

const FEED_POSTS = gql`
  query GetPosts {
    getPosts {
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

export default withRouter(compose(
  graphql(FEED_POSTS, { name: 'getPosts' }))(BlogContainer));
