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
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator, CommentContainer } from 'components';
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import fetch from "unfetch";

class Comment extends Component {
  toggleUpvoteCreated () {
    this.setState({
      upvoteCreated: !this.state.upvoteCreated
    })
  }

  toggleUpvoteDeleted () {
    this.setState({
      upvoteDeleted: !this.state.upvoteDeleted
    })
  }

  render() {
    return (
      <div>
      <Box direction="column" style={{ width: '100%' }}>
        <Box direction="row">
          <Box align="center" justify="center" className="avatar-box">
            <img
              alt="user avatar"
              className="avatar avatar__small"
              src={comment.user.avatar}
            />
            <Label uppercase>
              {comment.user.name}
            </Label>
          </Box>
          <Box align="center" justify="center">
            <Heading tag="h4">
              {`Posted on ${moment(comment.created_at).format('MMM Do YY h:mm:ss a')}`}
            </Heading>
            <Markdown content={comment.body} />
          </Box>
        </Box>
        <Menu direction="row" inline responsive={false}>
          <Box align="center" justify="end" style={{ width: '100%' }} direction="row">
            <Value size="small" value={comment.total_votes} />
            <Button
              plain
              icon={<LinkUpIcon />}
              onClick={() => {this._createUpvote(); this.setState({ comment_id: comment.id })}}
            />
          </Box>
        </Menu>
      </Box>
        {this.state.upvoteCreated == true &&
          <Toast status='ok' onClose={() => this.toggleUpvoteCreated()}>
            Your upvote has been created.
          </Toast>
        }
        {this.state.upvoteDeleted == true &&
          <Toast status='ok' onClose={() => this.toggleUpvoteDeleted()}>
            Your upvote has been deleted.
          </Toast>
        }
      </div>
    );

    _createUpvote = async function() {
      const comment_id = this.state.comment_id
      const project_id = this.state.project_id
      this.setState({ body_field: "" })
      await this.props.createUpvote({
        variables: {
          project_id,
          comment_id
        }
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
      if (this.state.errors) {
        {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
      }
      if (!this.state.errors) {
        this.toggleUpvoteCreated();
      }
    }

    _deleteUpvote = async function() {
      const comment_id = this.state.comment_id
      const project_id = this.state.project_id
      this.setState({ body_field: "" })
      await this.props.deleteUpvote({
        variables: {
          project_id,
          comment_id
        }
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
      if (this.state.errors) {
        {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
      }
      if (!this.state.errors) {
        this.toggleUpvoteDeleted();
      }
    }

    _updateCacheAfterComments = (store, createComment, commentId) => {
      const data = store.readQuery({ query: FEED_PROJECT })

      const votedLink = data.feed.links.find(link => link.id === commentId)
      votedLink.votes = createVote.link.votes

      store.writeQuery({ query: FEED_PROJECT, data })
    }
  }
}

const CREATE_UPVOTE = gql`
  mutation CreateUpvote($project_id: Int!, $comment_id: Int!) {
    createUpvote(project_id: $project_id, comment_id: $comment_id) {
      id
    }
  }
`;

const DELETE_UPVOTE = gql`
  mutation DeleteUpvote($project_id: Int!, $comment_id: Int!) {
    deleteUpvote(project_id: $project_id, comment_id: $comment_id) {
      id
    }
  }
`;

export default compose(
graphql(CREATE_UPVOTE, { name: 'createUpvote' }),
graphql(DELETE_UPVOTE, { name: 'deleteUpvote' })) (Comment);
