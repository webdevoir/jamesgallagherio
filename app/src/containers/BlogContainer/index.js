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

    if (this.props.getPosts && this.props.getPosts.error) {
      return <div>Error</div>
    }

    const postsToRender = this.props.getPosts.getPosts

    return (
      <div>
      <br />
      <br />
      <Heading align="center" tag="h2">
        Blog
      </Heading>
      <Divider />
      {projectsToRender && projectsToRender.length > 0 &&
        <Tiles fill={true} basis="1/2">
            {postsToRender.map(post =>
              <Tile>
                <Card thumbnail={post.feature_image}
                label={post.user.name}
                heading={post.title}
                description={post.description}
                link={<Anchor href={`/blog/${post.slug}`}
                icon={<LinkNextIcon />}
                label='Read more' />}
                contentPad='small'
                textSize='medium' />
              </Tile>
                )
              }
        </Tiles>
      }
      {!projectsToRender &&
        <Box className={styles.box} pad="medium">
          <Heading align="center" tag="h2">
            Blog
          </Heading>
          <Divider />
          <Paragraph align="center" pad="medium" className={styles.main_text}>
            No blog posts are available at this time.
          </Paragraph>
        </Box>
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
    }
  }
`;

export default withRouter(compose(
  graphql(FEED_POSTS, { name: 'getPosts' }))(BlogContainer));