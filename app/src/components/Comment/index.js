import React, { Component } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Section from "grommet-udacity/components/Section";
import Box from "grommet-udacity/components/Box";
import Columns from "grommet-udacity/components/Columns";
import Markdown from "grommet-udacity/components/Markdown";
import Heading from "grommet-udacity/components/Heading";
import Label from "grommet-udacity/components/Label";
import Hero from "grommet/components/Hero";
import Image from "grommet/components/Image";
import Headline from "grommet/components/Headline";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Menu from "grommet/components/Menu";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Paragraph from "grommet/components/Paragraph";
import Card from "grommet-udacity/components/Card";
import Footer from "grommet-udacity/components/Footer";
import Toast from "grommet-udacity/components/Toast";
import Meter from "grommet-udacity/components/Meter";
import Value from "grommet-udacity/components/Value";
import Button from "grommet-udacity/components/Button";
import Carousel from "grommet-udacity/components/Carousel";
import OverviewIcon from "grommet/components/icons/base/Overview";
import SocialGithubIcon from "grommet/components/icons/base/SocialGithub";
import LinkUpIcon from "grommet/components/icons/base/LinkUp";
import { createHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import cssModules from "react-css-modules";
import { Divider, LoadingIndicator, CommentContainer } from "components";
import regeneratorRuntime from "regenerator-runtime";
import axios from "axios";
import styles from "./index.module.scss";
import fetch from "unfetch";
import moment from "moment";

class Comment extends Component {
  state = {
    upvoteCreatedToast: false,
    upvoteDeleted: false,
    comment_id: ""
  };

  toggleUpvoteCreated() {
    this.setState({
      upvoteCreatedToast: !this.state.upvoteCreatedToast
    });
  }

  toggleUpvoteDeleted() {
    this.setState({
      upvoteDeleted: !this.state.upvoteDeleted
    });
  }

  render() {
    if (this.props.getUpvotes && this.props.getUpvotes.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getUpvotes && this.props.getUpvotes.error) {
      return <div>Error</div>;
    }

    const comment = this.props.comment;
    const upvotesToRender = this.props.getUpvotes.getUpvotes;
    return (
      <div>
        <Box direction="column" style={{ width: "100%" }}>
          <Box direction="row">
            <Box align="center" justify="center" className="avatar-box">
              <img
                alt="user avatar"
                className={styles.userAvatar}
                src={comment.user.profile_picture}
              />
              <Label uppercase>{comment.user.name}</Label>
            </Box>
            <Box align="center" justify="center">
              <Heading tag="h4">
                {`Posted on ${moment(comment.created_at).format(
                  "MMM Do YY h:mm:ss a"
                )}`}
              </Heading>
              <Markdown content={comment.body} />
            </Box>
          </Box>
          <Menu direction="row" inline responsive={false}>
            <Box
              align="center"
              justify="end"
              style={{ width: "100%" }}
              direction="row"
            >
              <Value size="small" value={upvotesToRender.length || 0} />
              <Button
                plain
                icon={<LinkUpIcon />}
                onClick={() => {
                  this.setState({ comment_id: parseInt(comment.id) });
                  this._createUpvote();
                }}
              />
            </Box>
          </Menu>
        </Box>
        {this.state.upvoteCreatedToast == true && (
          <Toast status="ok" onClose={() => this.toggleUpvoteCreated()}>
            Your upvote has been posted.
          </Toast>
        )}
      </div>
    );
  }

  _createUpvote = async function() {
    const comment_id = this.state.comment_id;
    const { slug, status } = this.props;
    this.setState({ body_field: "", errors: false });
    await this.props
      .createUpvote({
        variables: {
          comment_id,
          slug,
          status
        }
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
    if (this.state.errors) {
      {
        this.state.errors.map(error =>
          this.setState({ [error.field]: error.message })
        );
      }
    }
    if (!this.state.errors) {
      this.toggleUpvoteCreated();
    }
  };

  _updateCacheAfterComments = (store, createComment, commentId) => {
    const data = store.readQuery({ query: FEED_PROJECT });

    const votedLink = data.feed.links.find(link => link.id === commentId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_PROJECT, data });
  };
}

const CREATE_UPVOTE = gql`
  mutation CreateUpvote($slug: String!, $comment_id: Int!, $status: String!) {
    createUpvote(slug: $slug, comment_id: $comment_id, status: $status) {
      id
    }
  }
`;

const FEED_UPVOTES = gql`
  query GetUpvotes($slug: String!, $status: String!, $comment_id: Int!) {
    getUpvotes(slug: $slug, status: $status, comment_id: $comment_id) {
      id
    }
  }
`;

export default compose(
  graphql(CREATE_UPVOTE, { name: "createUpvote" }),
  graphql(FEED_UPVOTES, {
    name: "getUpvotes",
    options: props => ({
      variables: {
        slug: props.slug,
        status: props.status,
        comment_id: parseInt(props.comment_id)
      }
    })
  })
)(Comment);
