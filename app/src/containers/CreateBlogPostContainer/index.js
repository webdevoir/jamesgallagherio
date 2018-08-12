import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Router, Route, Link, RouteHandler, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from 'grommet-udacity/components/Box';
import Paragraph from 'grommet-udacity/components/Paragraph';
import Article from 'grommet-udacity/components/Article';
import Heading from 'grommet-udacity/components/Heading';
import Markdown from 'grommet-udacity/components/Markdown';
import Section from 'grommet-udacity/components/Section';
import EditIcon from 'grommet-udacity/components/icons/base/Edit';
import List from 'grommet-udacity/components/List';
import Form from 'grommet-udacity/components/Form';
import Select from 'grommet-udacity/components/Select';
import FormField from 'grommet-udacity/components/FormField';
import Button from 'grommet-udacity/components/Button';
import TextInput from 'grommet-udacity/components/TextInput';
import ListItem from 'grommet-udacity/components/ListItem';
import Layer from 'grommet-udacity/components/Layer';
import Header from 'grommet-udacity/components/Header';
import Label from 'grommet-udacity/components/Label';
import Accordion from 'grommet-udacity/components/Accordion';
import AccordionPanel from 'grommet-udacity/components/AccordionPanel';
import Anchor from 'grommet-udacity/components/Anchor';
import Status from 'grommet/components/icons/Status';
import DownloadIcon from 'grommet-udacity/components/icons/base/Download';
import StarIcon from 'grommet-udacity/components/icons/base/Star';
import SearchInput from 'grommet-udacity/components/SearchInput';
import FormFields from 'grommet-udacity/components/FormFields';
import Footer from 'grommet-udacity/components/Footer';
import CheckBox from 'grommet-udacity/components/CheckBox';
import Headline from 'grommet-udacity/components/Headline';
import Title from 'grommet-udacity/components/Title';
import Tabs from 'grommet-udacity/components/Tabs';
import Tab from 'grommet-udacity/components/Tab';
import Toast from 'grommet-udacity/components/Toast';
import { Divider, LoadingIndicator } from 'components';
import { graphql, compose } from 'react-apollo'
import styles from './index.module.scss';
import gql from 'graphql-tag';
import regeneratorRuntime from "regenerator-runtime";
import createHistory from "history"
import AUTH_TOKEN from '../../constants'
import { Select as TagSelect } from 'antd';
const Option = TagSelect.Option;
const qs = require('query-string');

// eslint-disable-next-line react/prefer-stateless-function
class CreatePostContainer extends Component {
  constructor() {
    super();
    this.handleTags = this.handleTags.bind(this);
    this.state = {
      postCreated: false,
      infoLoaded: false,
      title: "",
      slug: "",
      status: "",
      description: "",
      caption: "",
      milestones: "",
      repo_url: "",
      category: "",
      feature_image: "",
      post_url: "",
      technical_information: "",
      tags: ""
    }
  }

  togglePostCreated () {
    this.setState({
      postCreated: !this.state.postCreated
    })
  }

  togglePostUpdated () {
    this.setState({
      postUpdated: !this.state.postUpdated
    })
  }

  togglePostImageCreated () {
    this.setState({
      postImageCreated: !this.state.postImageCreated
    })
  }

  togglePostImageDeleted () {
    this.setState({
      postImageDeleted: !this.state.postImageDeleted
    })
  }

  handleTags(value) {
    const {
      tags,
    } = this.props;
    const newTags = value.map(tag => tags[tag] || { title: tag });
    this.props.actions.createPostSetTags(newTags);
  }

  render() {

    if (qs.parse(location.search).slug) {
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
      const post = this.props.getPost.getPost[0]
      if (this.state.infoLoaded == false) {
        this.setState({
          title: post.title,
          slug: post.slug,
          status: post.status,
          description: post.description,
          caption: post.caption,
          milestones: post.milestones,
          repo_url: post.repo_url,
          category: post.category,
          feature_image: post.feature_image,
          post_url: post.post_url,
          technical_information: post.technical_information,
          tags: post.tags,
          infoLoaded: true
        })
      }
    } else {
      const post = {}
      if (this.state.infoLoaded == false) {
        this.setState({ infoLoaded: true })
      }
    }

    return (
      <Section
        primary
        pad={{ horizontal: 'large' }}
        align="center"
        justify="center"
        className={styles.login}
      >
      <Box
          size="large"
          className={styles.loginFormWrapper}
          align="center"
          pad={{ horizontal: 'small', vertical: 'small' }}
        >
        <br />
        <Heading tag="h1" align="center">
          Create Post
        </Heading>
        <Divider />
        <Box
          className={styles.loginForm}
          pad={{ horizontal: 'large' }}
        >
          <Box align="center" justify="center">
            <img
              style={{ maxWidth: 150, height: 'auto' }}
            />
          </Box>
          <FormFields className={styles.formFields}>
          <Section pad={{ vertical: 'medium' }} align="left" justify="left">
            <Label align="left">
              Post Information
            </Label>
              <FormField
                help="Enter the post title"
                label="Title *"
                htmlFor="titleInput"
                className={styles.formField}
                error={this.state.title_field ? this.state.title_field : ""}
              >
                <input
                  required
                  id="titleInput"
                  name="title"
                  defaultValue={this.state.title}
                  placeholder={`Awesome Post`}
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            {!qs.parse(location.search).slug &&
              <FormField
                help="Enter the post slug"
                label="Title *"
                htmlFor="slugInput"
                className={styles.formField}
                error={this.state.slugfield ? this.state.slug_field : ""}
              >
                <input
                  required
                  id="slugInput"
                  name="slug"
                  defaultValue={this.state.slug}
                  placeholder={`awesome-post`}
                  type="text"
                  onChange={e => this.setState({ slug: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            }
            <FormField
              help="Enter the post status"
              label="Status *"
              htmlFor="statusInput"
              className={styles.formField}
              error={this.state.status_field ? this.state.status_field : ""}
            >
              <Select
              required
              options={['Published', 'Unpublished']}
              value={this.state.status}
              onChange={event => this.setState({ status: event.option })}/>
            </FormField>
            <FormField
              help="Enter the post body (supports markdown)."
              label="Body *"
              htmlFor="bodyInput"
              className={styles.formField}
              error={this.state.body_field ? this.state.body_field : ""}
            >
              <textarea
                required
                id="bodyInput"
                name="body"
                defaultValue={this.state.body}
                type="text"
                onChange={e => this.setState({ body: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </Section>
          <Section pad={{ vertical: 'medium' }} align="left" justify="left">
            <Label align="left">
              Images
            </Label>
              <FormField
                help="Enter the feature image URL"
                label="Feature Image URL *"
                htmlFor="feature_imageInput"
                className={styles.formField}
                error={this.state.feature_image_field ? this.state.feature_image_field : ""}
              >
                <input
                  required
                  id="feature_imageInput"
                  name="feature_image"
                  defaultValue={this.state.feature_image}
                  placeholder={`Awesome Post`}
                  type="text"
                  onChange={e => this.setState({ feature_image: e.target.value })}
                  className={styles.input}
                />
              </FormField>
          </Section>
          <Section pad={{ vertical: 'medium' }} align="left" justify="left">
            <Label align="left">
              Technical Information
            </Label>
              <FormField
                help="The post tags"
                label="Tags *"
                htmlFor="tagsInput"
                className={styles.formField}
                error={this.state.tags_field ? this.state.tags_field : ""}
              >
                <input
                  required
                  id="tagsInput"
                  name="tags"
                  placeholder={`Ruby on Rails, GraphQL, React`}
                  type="text"
                  onChange={e => this.setState({ tags: e.target.value })}
                  className={styles.input}
                />
              </FormField>
          </Section>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }} align="center">
            <Button fill label="Submit" type="submit" onClick={() => this._createPost()} />
          </Footer>

          {this.state.postCreated == true &&
            <Toast status='ok' onClose={() => this.togglePostCreated()}>
              This blog post has been created.
            </Toast>
          }
          {this.state.postUpdated == true &&
            <Toast status='ok' onClose={() => this.togglePostUpdated()}>
              This blog post has been updated.
            </Toast>
          }
          </Box>
      </Box>
      </Section>
    );
  }

  _createPost = async function() {
    const { title,
      slug,
      status,
      body,
      feature_image,
      tags} = this.state
    this.setState({ title_field: "",
      slug_field: "",
      status_field: "",
      body_field: "",
      feature_image_field: "",
      tags_field: "" })
    await this.props.createPost({
      variables: {
        title,
        slug,
        status,
        body,
        feature_image,
        tags
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.togglePostCreated();
    }
  }

  _createPost = async function() {
    const { title,
      status,
      body,
      feature_image,
      tags} = this.state
    const slug = qs.parse(location.search).slug
    this.setState({ title_field: "",
      slug_field: "",
      status_field: "",
      body_field: "",
      feature_image_field: "",
      tags_field: "" })
    await this.props.updatePost({
      variables: {
        title,
        slug,
        status,
        body,
        feature_image,
        tags
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.togglePostCreated();
    }
  }
}

const CREATE_POST = gql`
  mutation CreatePost($title: String, $status: String, $body: String, $feature_image: String, $tags: String) {
    createPost(title: $title, slug: $slug, status: $status, body: $body, feature_image: $feature_image, tags: $tags) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($title: String, $status: String, $body: String, $feature_image: String, $tags: String) {
    updatePost(title: $title, slug: $slug, status: $status, body: $body, feature_image: $feature_image, tags: $tags) {
      id
    }
  }
`;

const FEED_PROJECT = gql`
  query GetPost($slug: String!) {
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

export default compose(
  graphql(CREATE_POST, { name: 'createPost' }),
  graphql(UPDATE_POST, { name: 'updatePost' }),
  graphql(FEED_POST, { name: 'getPost', options: (props) => ( {variables: { slug: qs.parse(location.search).slug } })})) (CreatePostContainer);
