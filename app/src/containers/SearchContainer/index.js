import React, { Component } from "react";
import { withRouter, browserHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Section from "grommet-udacity/components/Section";
import Box from "grommet-udacity/components/Box";
import Columns from "grommet-udacity/components/Columns";
import Markdown from "grommet-udacity/components/Markdown";
import Heading from "grommet-udacity/components/Heading";
import Label from "grommet-udacity/components/Label";
import Image from "grommet/components/Image";
import Headline from "grommet/components/Headline";
import ListItem from "grommet/components/ListItem";
import Paragraph from "grommet/components/Paragraph";
import Card from "grommet-udacity/components/Card";
import Meter from "grommet-udacity/components/Meter";
import Value from "grommet-udacity/components/Value";
import Button from "grommet-udacity/components/Button";
import Carousel from "grommet-udacity/components/Carousel";
import LinkPreviousIcon from "grommet-udacity/components/icons/base/LinkPrevious";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import Menu from "grommet/components/Menu";
import { createHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { FullSection, MainContent, MainBox, StyledTitle, SectionLast, NavigationItem } from "./styles";
import cssModules from "react-css-modules";
import { Divider, LoadingIndicator } from "components";
import regeneratorRuntime from "regenerator-runtime";
import axios from "axios";
import fetch from "unfetch";
const qs = require("query-string");

class ProjectsContainer extends Component {
  state = {
    showing: "projects"
  }
  render() {
    if (this.props.getProjects && this.props.getProjects.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getProjects && this.props.getProjects.error) {
      return <div>Error</div>;
    }

    if (this.props.getPosts && this.props.getPosts.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getPosts && this.props.getPosts.error) {
      return <div>Error</div>;
    }

    const projectsToRender = this.props.getProjects.getProjects;
    const postsToRender = this.props.getPosts.getPosts;
    const searchTerm = qs.parse(location.search).query;
    const projectResults = projectsToRender.filter((project) => {
      return project.title.toLowerCase().includes(searchTerm) === true;
    });
    const postResults = postsToRender.filter((post) => {
      return post.title.toLowerCase().includes(searchTerm) === true;
    });

    return (
      <div>
        {searchTerm &&
          searchTerm !== "" && (
            <Box className={styles.search} colorIndex="light-2">
              <div className={styles.container}>
                <br />
                <Title tag="h2" align="center" justify="center">
                  {`Found ${
                    projectResults.length
                  } results for the term "${searchTerm}"`}
                </Title>
              <Section direction="row" className={styles.sectionMain}>
                <Box basis="1/4" className={styles.leftColumn}>
                  <Menu responsive={false} direction="column">
                    <NavigationItem
                      active={this.state.showing === "projects"}
                      onClick={() => this.setState({ showing: "projects" })}
                    >
                      Projects
                      <span className={styles.numberIndicator}>
                        {(projectResults && projectResults.length) || 0}
                      </span>
                    </NavigationItem>
                    <NavigationItem
                      active={this.state.showing === "posts"}
                      onClick={() => this.setState({ showing: "posts" })}
                    >
                      Blog Posts
                      <span className={styles.numberIndicator}>
                        {(postResults && postResults.length) || 0}
                      </span>
                    </NavigationItem>
                  </Menu>
                </Box>
                {this.state.showing == "projects" &&
                  <Box basis="3/4" flex="grow" className={styles.rightColumn}>
                    {projectResults &&
                      projectResults.length > 0 &&
                      projectResults.map((item, i) => (
                        <div className={styles.card} key={i}>
                          <div className={styles.textContent}>
                            <Heading tag="h3" strong>
                              {item.title}
                            </Heading>
                            <Markdown content={item.description.slice(0, 100)} />
                            <Anchor primary href={`/projects/${item.slug}`}>
                              Read More
                            </Anchor>
                          </div>
                          <div className={styles.itemImage}>
                            <Image src={item.feature_image} />
                          </div>
                        </div>
                      ))}
                  </Box>
                }
                {this.state.showing == "posts" &&
                  <Box basis="3/4" flex="grow" className={styles.rightColumn}>
                    {postResults &&
                      postResults.length > 0 &&
                      postResults.map((post, i) => (
                        <div className={styles.card} key={i}>
                          <div className={styles.textContent}>
                            <Heading tag="h3" strong>
                              {post.title}
                            </Heading>
                            <Markdown content={post.body.slice(0, 100)} />
                            <Anchor primary href={`/blog/${post.slug}`}>
                              Read More
                            </Anchor>
                          </div>
                          <div className={styles.itemImage}>
                            <Image src={post.feature_image} />
                          </div>
                        </div>
                      ))}
                  </Box>
                }
              </Section>
              <Box align="center" justify="center" className={styles.centerBox}>
                <Anchor
                  icon={<LinkPreviousIcon size="small" />}
                  href="/"
                  label="Go Back Home"
                />
              </Box>
              </div>
            </Box>
          )}
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
      description
      feature_image
    }
  }
`;

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

export default withRouter(
  compose(
    graphql(FEED_PROJECTS, { name: "getProjects" }),
    graphql(FEED_POSTS, { name: "getPosts" })
  )(ProjectsContainer)
);
