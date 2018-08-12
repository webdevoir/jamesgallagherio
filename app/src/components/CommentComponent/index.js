import React, { Component, PropTypes } from 'react'
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
import Footer from 'grommet-udacity/components/Footer';
import Meter from 'grommet-udacity/components/Meter';
import Value from 'grommet-udacity/components/Value';
import Button from 'grommet-udacity/components/Button';
import Carousel from 'grommet-udacity/components/Carousel';
import Anchor from 'grommet-udacity/components/Anchor';
import Article from 'grommet-udacity/components/Article';
import OverviewIcon from 'grommet/components/icons/base/Overview';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator, CommentContainer } from 'components';
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import fetch from "unfetch";
import RichTextEditor from 'react-rte';
import styles from './index.module.scss'
import AUTH_TOKEN from '../../constants.js'

class CommentComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  toggleCommentCreated () {
    this.setState({
      commentCreated: !this.state.commentCreated
    })
  }

  toggleCommentUpdated () {
    this.setState({
      commentUpdated: !this.state.commentUpdated
    })
  }

  toggleCommentDeleted () {
    this.setState({
      commentDeleted: !this.state.commentDeleted
    })
  }

  render() {
    const currentUser = sessionStorage.getItem(AUTH_TOKEN)
    const comments = this.state.comments
    return (
      <div>
        <Section
          primary
          className={styles.container}
        >
          <Article className={styles.panel}>
            <Heading align="center" className="heading">
              Comments
            </Heading>
            <Divider />
            <RichTextEditor
              value={this.state.value}
              onChange={(val) => this.onChange(val)}
            />
          <Footer
            align="center"
            justify="center"
            pad="medium"
            direction="column"
          >
            <Button
              label="Submit Comment"
              onClick={() => this._createComment()}
            />
            {!currentUser &&
              <Label>
                <span style={{ marginLeft: 10 }}>
                  Please <Anchor href="/login" label="log in" /> to comment.
                </span>
              </Label>
            }
          </Footer>
            {comments && comments.length > 0 &&
            <Article className="panel">
              <Columns size="large" justify="center">
                <List>
                  {comments && comments
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((comment, i) =>
                      <ListItem key={i}>
                        <Comment
                          onUpvote={onUpvote}
                          comment={comment}
                          slug={comment.slug}
                          status={comment.status}
                        />
                      </ListItem>,
                  )}
                </List>
              </Columns>
            </Article>
          }
          </Article>
        </Section>
        {this.state.commentCreated == true &&
          <Toast status='ok' onClose={() => this.toggleCommentCreated()}>
            Your comment has been created.
          </Toast>
        }
        {this.state.commentUpdated == true &&
          <Toast status='ok' onClose={() => this.toggleCommentUpdated()}>
            Your comment has been updated.
          </Toast>
        }
        {this.state.commentDeleted == true &&
          <Toast status='ok' onClose={() => this.toggleCommentDeleted()}>
            Your comment has been deleted.
          </Toast>
        }
      </div>
    );

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
        this.toggleCommentDeleted();
      }
    }

    _updateComment = async function() {
      const body = this.state.value
      const comment_id = this.state.comment_id
      const slug = this.state.slug
      const status = this.state.status
      this.setState({ body_field: "" })
      await this.props.updateComment({
        variables: {
          body,
          project_id,
          comment_id,
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
        this.toggleCommentUpdated();
      }
    }

    _deleteComment = async function() {
      const comment_id = this.state.comment_id
      const slug = this.state.slug
      const status = this.state.status
      this.setState({ body_field: "" })
      await this.props.deleteComment({
        variables: {
          slug,
          status,
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
        this.setState({ body_field: "" })
        this.toggleCommentDeleted();
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

const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!, $slug: String!, status: $Status) {
    createComment(body: $body, slug: $slug, status: $status) {
      id
      body
      project_id
      user {
        name
        profile_picture
      }
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation UpdateComment($body: String!, $slug: String!, comment_id: Int!, status: $Status) {
    updateComment(body: $body, slug: $slug, comment_id: $comment_id, status: $status) {
      id
      body
      project_id
      user {
        name
        profile_picture
      }
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($body: String!, $slug: String!, comment_id: Int!, status: $Status) {
    deleteComment(body: $body, slug: $slug, comment_id: $comment_id, status: $status) {
      id
    }
  }
`;

export default compose(
graphql(CREATE_COMMENT, { name: 'createComment' }),
graphql(UPDATE_COMMENT, { name: 'updateComment' }),
graphql(DELETE_COMMENT, { name: 'deleteComment' })) (CommentComponent);
