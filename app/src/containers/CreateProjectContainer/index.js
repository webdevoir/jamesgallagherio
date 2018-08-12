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
class CreateProjectContainer extends Component {
  constructor() {
    super();
    this.handleTags = this.handleTags.bind(this);
    this.state = {
      projectCreated: false,
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
      project_url: "",
      technical_information: "",
      tags: ""
    }
  }

  toggleProjectCreated () {
    this.setState({
      projectCreated: !this.state.projectCreated
    })
  }

  toggleProjectUpdated () {
    this.setState({
      projectUpdated: !this.state.projectUpdated
    })
  }

  toggleProjectImageCreated () {
    this.setState({
      projectImageCreated: !this.state.projectImageCreated
    })
  }

  toggleProjectImageDeleted () {
    this.setState({
      projectImageDeleted: !this.state.projectImageDeleted
    })
  }

  handleTags(value) {
    const {
      tags,
    } = this.props;
    const newTags = value.map(tag => tags[tag] || { title: tag });
    this.props.actions.createProjectSetTags(newTags);
  }

  render() {

    if (qs.parse(location.search).slug) {
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
      const project = this.props.getProject.getProject[0]
      if (this.state.infoLoaded == false) {
        this.setState({
          title: project.title,
          slug: project.slug,
          status: project.status,
          description: project.description,
          caption: project.caption,
          milestones: project.milestones,
          repo_url: project.repo_url,
          category: project.category,
          feature_image: project.feature_image,
          project_url: project.project_url,
          technical_information: project.technical_information,
          tags: project.tags,
          infoLoaded: true
        })
      }
    } else {
      const project = {}
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
          Create Project
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
              Project Information
            </Label>
              <FormField
                help="Enter the project title"
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
                  placeholder={`Awesome Project`}
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            {!qs.parse(location.search).slug &&
              <FormField
                help="Enter the project slug"
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
                  placeholder={`awesome-project`}
                  type="text"
                  onChange={e => this.setState({ slug: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            }
            <FormField
              help="Enter the project caption"
              label="Caption *"
              htmlFor="captionInput"
              className={styles.formField}
              error={this.state.caption_field ? this.state.caption_field : ""}
            >
              <input
                required
                id="captionInput"
                name="caption"
                defaultValue={this.state.caption}
                placeholder="An interesting, server-rendered app"
                type="text"
                onChange={e => this.setState({ caption: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter the project status"
              label="Status *"
              htmlFor="statusInput"
              className={styles.formField}
              error={this.state.status_field ? this.state.status_field : ""}
            >
              <Select
              required
              options={['Complete', 'In Progress']}
              value={this.state.status}
              onChange={event => this.setState({ status: event.option })}/>
            </FormField>
            <FormField label='Category *' help="What is the project's category?"
            className={styles.formField}
            error={this.state.category_field ? this.state.category_field : ""}>
              <Select
              required
              options={['Front-End', 'Back-End', 'Full-Stack']}
              value={this.state.category}
              onChange={event => this.setState({ category: event.option })}/>
            </FormField>
            <FormField
              help="Enter the project Github repository URL"
              label="Repository URL"
              htmlFor="repository_urlInput"
              className={styles.formField}
              error={this.state.repository_url_field ? this.state.repository_url_field : ""}
            >
              <input
                id="repository_urlInput"
                name="repository_url"
                defaultValue={this.state.repository_url}
                placeholder="https://github.com/octocat/Spoon-Knife"
                type="text"
                onChange={e => this.setState({ repository_url: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter the project showcase URL"
              label="Project URL"
              htmlFor="project_urlInput"
              className={styles.formField}
              error={this.state.project_url_field ? this.state.project_url_field : ""}
            >
              <input
                id="project_urlInput"
                name="project_url"
                defaultValue={this.state.project_url}
                placeholder="https://google.com"
                type="text"
                onChange={e => this.setState({ repository_url: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter the project description (supports markdown)."
              label="Description *"
              htmlFor="descriptionInput"
              className={styles.formField}
              error={this.state.description_field ? this.state.description_field : ""}
            >
              <textarea
                required
                id="descriptionInput"
                name="description"
                defaultValue={this.state.description}
                type="text"
                onChange={e => this.setState({ description: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </Section>
          <Section pad={{ vertical: 'medium' }} align="left" justify="left">
            <Label align="left">
              Milestones
            </Label>
              <FormField
                help="The milestones for the project (supports markdown)."
                label="Milestones *"
                htmlFor="milestonesInput"
                className={styles.formField}
                error={this.state.milestones_field ? this.state.milestones_field : ""}
              >
                <textarea
                  required
                  id="milestonesInput"
                  name="milestones"
                  defaultValue={this.state.milestones}
                  type="text"
                  onChange={e => this.setState({ milestones: e.target.value })}
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
                  placeholder={`Awesome Project`}
                  type="text"
                  onChange={e => this.setState({ feature_image: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              {qs.parse(location.search).slug &&
                <div>
                <Label>
                 Project Gallery
                </Label>
                <Table>
                  <thead>
                  <tr>
                    <th>
                      Slug
                    </th>
                    <th>
                      Image URL
                    </th>
                  </tr>
              </thead>
                <tbody>
                {project.project_images.map(image =>
                  <TableRow>
                    <td>
                      {image.slug}
                    </td>
                    <td>
                      {image.image_url}
                    </td>
                    <Box direction="row">
                      <Button className={styles.buttonComponent} icon={<TrashIcon />}
                      onClick={() => {this._deleteProjectImage(); this.setState({ image_url: image.image_url })}}/>
                    </Box>
                    </TableRow>
                    )}
                  </tbody>
                </Table>
                <FormField
                  help="Enter the image URL"
                  label="Image URL *"
                  htmlFor="image_urlInput"
                  className={styles.formField}
                  error={this.state.image_url_field ? this.state.image_url_field : ""}
                >
                  <input
                    required
                    id="image_urlInput"
                    name="image_url"
                    placeholder={`Awesome Project`}
                    type="text"
                    onChange={e => this.setState({ image_url: e.target.value })}
                    className={styles.input}
                  />
                </FormField>
                <Button className={styles.buttonComponent} icon={<AddIcon />}
                label='Create Image'
                onClick={() => this.toggleCreateImage()}/>
                </div>
              }
          </Section>
          <Section pad={{ vertical: 'medium' }} align="left" justify="left">
            <Label align="left">
              Technical Information
            </Label>
              <FormField
                help="The technical information for the project (supports markdown)."
                label="Technical Review *"
                htmlFor="technical_informationInput"
                className={styles.formField}
                error={this.state.technical_information_field ? this.state.technical_information_field : ""}
              >
                <textarea
                  required
                  id="technical_informationInput"
                  name="technical_information"
                  defaultValue={this.state.technical_information}
                  type="text"
                  onChange={e => this.setState({ technical_information: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="The project tags"
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
            <Button fill label="Submit" type="submit" onClick={() => this._createProject()} />
          </Footer>

          {this.state.projectCreated == true &&
            <Toast status='ok' onClose={() => this.toggleProjectCreated()}>
              This project has been created.
            </Toast>
          }
          {this.state.projectUpdated == true &&
            <Toast status='ok' onClose={() => this.toggleProjectUpdated()}>
              This project has been updated.
            </Toast>
          }
          {this.state.projectImageCreated == true &&
            <Toast status='ok' onClose={() => this.toggleProjectImageCreated()}>
              This project image has been created.
            </Toast>
          }
          {this.state.projectImageDeleted == true &&
            <Toast status='ok' onClose={() => this.toggleProjectImageDeleted()}>
              This project image has been deleted.
            </Toast>
          }
          </Box>
      </Box>
      </Section>
    );
  }

  _createProjectImage = async function() {
    const { image_url } = this.state
    const slug = qs.parse(location.search).slug
    this.setState({ image_url_field: ""})
    await this.props.createProjectImage({
      variables: {
        slug,
        image_url
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ image_url_field: ""})
      this.toggleProjectImageCreated();
    }
  }

  _deleteProjectImage = async function() {
    const { image_url } = this.state
    const slug = qs.parse(location.search).slug
    this.setState({ image_url_field: ""})
    await this.props.deleteProjectImage({
      variables: {
        slug,
        image_url
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ image_url_field: ""})
      this.toggleProjectImageCreated();
    }
  }

  _createProject = async function() {
    const { title,
      slug,
      status,
      description,
      caption,
      milestones,
      repo_url,
      category,
      feature_image,
      project_url,
      technical_information,
      tags} = this.state
    this.setState({ title_field: "",
      slug_field: "",
      status_field: "",
      description_field: "",
      caption_field: "",
      milestones_field: "",
      repo_url_field: "",
      category_field: "",
      feature_image_field: "",
      project_url_field: "",
      technical_information_field: "",
      tags_field: "" })
    await this.props.createProject({
      variables: {
        title,
        slug,
        status,
        description,
        caption,
        milestones,
        repo_url,
        category,
        feature_image,
        project_url,
        technical_information,
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
      this.setState({ title_field: "",
        slug_field: "",
        status_field: "",
        description_field: "",
        caption_field: "",
        milestones_field: "",
        repo_url_field: "",
        category_field: "",
        feature_image_field: "",
        project_url_field: "",
        technical_information_field: "",
        tags_field: "" })
      this.toggleProjectCreated();
    }
  }

  _updateProject = async function() {
    const { title,
      status,
      description,
      caption,
      milestones,
      repo_url,
      category,
      feature_image,
      project_url,
      technical_information,
      tags} = this.state
    const slug = qs.parse(location.search).slug
    this.setState({ title_field: "",
      slug_field: "",
      status_field: "",
      description_field: "",
      caption_field: "",
      milestones_field: "",
      repo_url_field: "",
      category_field: "",
      feature_image_field: "",
      project_url_field: "",
      technical_information_field: "",
      tags_field: "" })
    await this.props.updateProject({
      variables: {
        title,
        slug,
        status,
        description,
        caption,
        milestones,
        repo_url,
        category,
        feature_image,
        project_url,
        technical_information,
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
      this.setState({ title_field: "",
        slug_field: "",
        status_field: "",
        description_field: "",
        caption_field: "",
        milestones_field: "",
        repo_url_field: "",
        category_field: "",
        feature_image_field: "",
        project_url_field: "",
        technical_information_field: "",
        tags_field: "" })
      this.toggleProjectUpdated();
    }
  }
}

const CREATE_PROJECT = gql`
  mutation CreateProject($title: String, $slug: String, $status: String, $description: String, $caption: String, $milestones: String, $repo_url: String, $category: String, $feature_image: String, $project_url: String, $technical_information: String, $tags: String) {
    createProject(title: $title, slug: $slug, status: $status, description: $description, caption: $caption, milestones: $milestones, repo_url: $repo_url, category: $category, feature_image: $feature_image, project_url: $project_url, technical_information: $technical_information, tags: $tags) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation CreateProject($title: String, $slug: String, $status: String, $description: String, $caption: String, $milestones: String, $repo_url: String, $category: String, $feature_image: String, $project_url: String, $technical_information: String, $tags: String) {
    createProject(title: $title, slug: $slug, status: $status, description: $description, caption: $caption, milestones: $milestones, repo_url: $repo_url, category: $category, feature_image: $feature_image, project_url: $project_url, technical_information: $technical_information, tags: $tags) {
      id
    }
  }
`;

const CREATE_PROJECT_IMAGE = gql`
  mutation CreateProjectImage($slug: String, $image_url: String) {
    createProjectImage(slug: $slug, image_url: $image_url) {
      id
    }
  }
`;

const DELETE_PROJECT_IMAGE = gql`
  mutation DeleteProjectImage($slug: String, $image_url: String) {
    deleteProjectImage(slug: $slug, image_url: $image_url) {
      id
    }
  }
`;

const FEED_PROJECT_IMAGES = gql`
  query GetProjectImages($slug: String!) {
    getProjectImages(slug: $slug) {
      id
      project_id
      image_url
    }
  }
`;

const FEED_PROJECT = gql`
  query GetProject($slug: String!) {
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

export default compose(
  graphql(CREATE_PROJECT, { name: 'createProject' }),
  graphql(UPDATE_PROJECT, { name: 'updateProject' }),
  graphql(CREATE_PROJECT_IMAGE, { name: 'createProjectImage' }),
  graphql(DELETE_PROJECT_IMAGE, { name: 'deleteProjectImage' }),
  graphql(FEED_PROJECT, { name: 'getProject', options: (props) => ( {variables: { slug: qs.parse(location.search).slug } })}),
  graphql(FEED_PROJECT_IMAGES, { name: 'getProjectImages', options: (props) => ( {variables: { slug: qs.parse(location.search).slug } })})) (CreateProjectContainer);
