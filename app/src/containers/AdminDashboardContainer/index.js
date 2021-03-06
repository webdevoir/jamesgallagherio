import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Box from "grommet-udacity/components/Box";
import List from "grommet-udacity/components/List";
import Heading from "grommet-udacity/components/Heading";
import Tabs from "grommet-udacity/components/Tabs";
import Tab from "grommet-udacity/components/Tab";
import Paragraph from "grommet-udacity/components/Paragraph";
import Section from "grommet-udacity/components/Section";
import ListItem from "grommet-udacity/components/ListItem";
import TableRow from "grommet-udacity/components/TableRow";
import Anchor from "grommet-udacity/components/Anchor";
import Table from "grommet-udacity/components/Table";
import Toast from "grommet-udacity/components/Toast";
import BookIcon from "grommet-udacity/components/icons/base/Book";
import EditIcon from "grommet-udacity/components/icons/base/Edit";
import DashboardIcon from "grommet-udacity/components/icons/base/Dashboard";
import ImageIcon from "grommet-udacity/components/icons/base/Image";
import UserSettingsIcon from "grommet-udacity/components/icons/base/UserSettings";
import ArticleIcon from "grommet-udacity/components/icons/base/Article";
import DocumentIcon from "grommet-udacity/components/icons/base/Document";
import TrashIcon from "grommet-udacity/components/icons/base/Trash";
import AddIcon from "grommet-udacity/components/icons/base/Add";
import ViewIcon from "grommet/components/icons/base/View";
import Button from "grommet-udacity/components/Button";
import Layer from "grommet-udacity/components/Layer";
import FormFields from "grommet-udacity/components/FormFields";
import FormField from "grommet-udacity/components/FormField";
import Select from "grommet-udacity/components/Select";
import Footer from "grommet-udacity/components/Footer";
import Menu from "grommet-udacity/components/Menu";
import Label from "grommet-udacity/components/Label";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import {
  FullSection,
  MainContent,
  MainBox,
  ThumbnailImage,
  Wrapper,
  BoxWrapper
} from "./styles";
import cssModules from "react-css-modules";
import { Divider, LoadingIndicator } from "components";
import regeneratorRuntime from "regenerator-runtime";
import AUTH_TOKEN from "../../constants";

class AdminDashboardContainer extends Component {
  state = {
    reference: ""
  };
  toggleDeleteUserToast() {
    this.setState({
      deleteUserToast: !this.state.deleteUserToast
    });
  }
  toggleDeletePostToast() {
    this.setState({
      deletePostToast: !this.state.deletePostToast
    });
  }
  toggleDeleteProjectToast() {
    this.setState({
      deleteProjectToast: !this.state.deleteProjectToast
    });
  }
  toggleDeleteReferenceToast() {
    this.setState({
      deleteReferenceToast: !this.state.deleteReferenceToast
    });
  }
  toggleUpdateReferenceToast() {
    this.setState({
      updateReferenceToast: !this.state.updateReferenceToast
    });
  }
  toggleCreateReference() {
    this.setState({
      createReferenceModal: !this.state.createReferenceModal
    });
  }
  toggleCreateReferenceToast() {
    this.setState({
      createReferenceToast: !this.state.createReferenceToast
    });
  }
  toggleUpdateReference() {
    this.setState({
      updateReferenceModal: !this.state.updateReferenceModal
    });
  }
  toggleCreateReferenceToast() {
    this.setState({
      createReferenceModal: !this.state.createReferenceModal
    });
  }
  toggleShowReference() {
    this.setState({
      showReferenceToast: !this.state.showReferenceToast
    });
  }
  toggleShowInquiry() {
    this.setState({
      showInquiry: !this.state.showInquiry
    });
  }
  toggleShowUser() {
    this.setState({
      showUser: !this.state.showUser
    });
  }
  toggleShowFeedback() {
    this.setState({
      showFeedback: !this.state.showFeedback
    });
  }
  render() {
    if (this.props.getUser && this.props.getUser.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getUser && this.props.getUser.error) {
      return <div>Error</div>;
    }

    const currentUser = this.props.getUser.getCurrentUser[0];

    if (!currentUser) {
      window.location.replace("/login");
    }

    if (currentUser.admin == false) {
      window.location.replace("/");
    }

    if (this.props.getAllUsers && this.props.getAllUsers.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getAllUsers && this.props.getAllUsers.error) {
      return <div>Error</div>;
    }

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

    if (this.props.getUsers && this.props.getUsers.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getUsers && this.props.getUsers.error) {
      return <div>Error</div>;
    }

    if (this.props.getReferences && this.props.getReferences.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getReferences && this.props.getReferences.error) {
      return <div>Error</div>;
    }

    if (this.props.getInquiries && this.props.getInquiries.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getInquiries && this.props.getInquiries.error) {
      return <div>Error</div>;
    }

    if (this.props.getAdminPosts && this.props.getAdminPosts.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getAdminPosts && this.props.getAdminPosts.error) {
      return <div>Error</div>;
    }

    if (this.props.getFeedback && this.props.getFeedback.loading) {
      return (
        <div>
          <LoadingIndicator isLoading />
        </div>
      );
    }

    if (this.props.getFeedback && this.props.getFeedback.error) {
      return <div>Error</div>;
    }

    const projectsToRender = this.props.getProjects.getProjects;
    const usersToRender = this.props.getUsers.getUsers;
    const inquiriesToRender = this.props.getInquiries.getInquiries;
    const referencesToRender = this.props.getReferences.getReferences;
    const postsToRender = this.props.getAdminPosts.getAdminPosts;
    const feedbackToRender = this.props.getFeedback.getFeedback;

    return (
      <MainBox alignContent="center" fill="horizontal" align="center">
        <FullSection primary direction="row">
          <MainContent
            align="center"
            justify="start"
            pad={{ vertical: "large" }}
          >
            <Heading align="center">Admin Dashboard</Heading>
            <Divider />
            <Box>
              <Box direction="row">
                <Button
                  icon={<BookIcon />}
                  label="Create Reference"
                  className={styles.buttonComponent}
                  onClick={() => {
                    this.toggleCreateReference();
                    this.setState({ project_id: project.id });
                  }}
                />
                <Button
                  icon={<ArticleIcon />}
                  label="Create Project"
                  className={styles.buttonComponent}
                  href="/admin/projects/new"
                />
                <Button
                  icon={<DocumentIcon />}
                  label="Create Post"
                  className={styles.buttonComponent}
                  href="/admin/posts/new"
                />
              </Box>
              <Tabs responsive={false}>
                <Tab title="Projects">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Tags</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsToRender.map(project => (
                          <TableRow>
                            <td>{project.title}</td>
                            <td>{project.status}</td>
                            <td>{project.tags}</td>
                            <td>
                              <Button
                                icon={<EditIcon />}
                                href={`/admin/projects/new?slug=${
                                  project.slug
                                }`}
                              />
                              <Button
                                icon={<TrashIcon />}
                                onClick={() => {
                                  this._deleteProject();
                                  this.setState({
                                    project_id: parseInt(project.id)
                                  });
                                }}
                              />
                              <Button
                                icon={<ViewIcon />}
                                href={`/projects/${project.slug}`}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Blog Posts">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Author</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {postsToRender.map(post => (
                          <TableRow>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>{post.user.name}</td>
                            <td>
                              <Button
                                icon={<EditIcon />}
                                href={`/admin/posts/new?slug=${post.slug}`}
                              />
                              <Button
                                icon={<TrashIcon />}
                                onClick={() => {
                                  this._deletePost();
                                  this.setState({ post_id: parseInt(post.id) });
                                }}
                              />
                              <Button
                                icon={<ViewIcon />}
                                href={`/blog/${post.slug}`}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Users">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersToRender.map(user => (
                          <TableRow>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {user.admin == true && <td>Admin</td>}
                            {user.admin == false && <td>User</td>}
                            <td>
                              <Button
                                icon={<TrashIcon />}
                                onClick={() => {
                                  this._deleteUser();
                                  this.setState({ user_id: parseInt(user.id) });
                                }}
                              />
                              <Button
                                icon={<ViewIcon />}
                                onClick={() => {
                                  this.toggleShowUser();
                                  this.setState({ user: user });
                                }}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="References">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Title</th>
                          <th>Company</th>
                          <th>Body</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referencesToRender.map(reference => (
                          <TableRow>
                            <td>{reference.name}</td>
                            <td>{reference.title}</td>
                            <td>{reference.company}</td>
                            <td>{reference.body}</td>
                            <td>
                              <Button
                                icon={<EditIcon />}
                                onClick={() => {
                                  this.toggleUpdateReference();
                                  this.setState({ reference: reference });
                                }}
                              />
                              <Button
                                icon={<TrashIcon />}
                                onClick={() => {
                                  this._deleteReference();
                                  this.setState({
                                    reference_id: parseInt(reference.id)
                                  });
                                }}
                              />
                              <Button
                                icon={<ViewIcon />}
                                onClick={() => {
                                  this.toggleShowReference();
                                  this.setState({ reference: reference });
                                }}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Inquiries">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Category</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiriesToRender.map(inquiry => (
                          <TableRow>
                            <td>{inquiry.name}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.category}</td>
                            <td>
                              <Button
                                icon={<ViewIcon />}
                                onClick={() => this.toggleShowInquiry()}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
                <Tab title="Feedback">
                  <Box
                    pad="large"
                    className={styles.listWrapper}
                    color="light-2"
                  >
                    <Table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Body</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiriesToRender.map(inquiry => (
                          <TableRow>
                            <td>{inquiry.title}</td>
                            <td>{inquiry.body}</td>
                            <td>
                              <Button
                                icon={<ViewIcon />}
                                onClick={() => this.toggleShowFeedback()}
                              />
                            </td>
                          </TableRow>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </MainContent>
        </FullSection>
        {this.state.showReference == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleShowReference();
            }}
          >
            <Box size="large" pad="large">
              <Heading align="center">
                {this.state.inquiry.name} - Inquiry
              </Heading>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Name:</Label>
                <Heading align="center" tag="h4">
                  {this.state.inquiry.name}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Email:</Label>
                <Heading align="center" tag="h4">
                  {this.state.inquiry.email}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Category:</Label>
                <Heading align="center" tag="h4">
                  {this.state.inquiry.category}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Message:</Label>
                <Heading align="center" tag="h4">
                  {this.state.reference.message}
                </Heading>
              </BoxWrapper>
            </Box>
          </Layer>
        )}
        {this.state.showUser == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleShowUser();
            }}
          >
            <Box size="large" pad="large">
              <Heading align="center">
                {this.state.user.name} - User Profile
              </Heading>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Name:</Label>
                <Heading align="center" tag="h4">
                  {this.state.user.name}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Email:</Label>
                <Heading align="center" tag="h4">
                  {this.state.user.email}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Bio:</Label>
                <Heading align="center" tag="h4">
                  {this.state.user.bio}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Role:</Label>
                {this.state.user.admin == true && (
                  <Heading align="center" tag="h4">
                    Admin
                  </Heading>
                )}
                {this.state.user.admin == false && (
                  <Heading align="center" tag="h4">
                    User
                  </Heading>
                )}
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Avatar:</Label>
                <Heading align="center" tag="h4">
                  {this.state.user.profile_image}
                </Heading>
              </BoxWrapper>
            </Box>
          </Layer>
        )}
        {this.state.showFeedback == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleShowFeedback();
            }}
          >
            <Box size="large" pad="large">
              <Heading align="center">
                {this.state.feedback.name} - Feedback
              </Heading>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Title:</Label>
                <Heading align="center" tag="h4">
                  {this.state.feedback.title}
                </Heading>
              </BoxWrapper>
              <BoxWrapper>
                <Label style={{ flex: 1 }}>Body:</Label>
                <Heading align="center" tag="h4">
                  {this.state.feedback.body}
                </Heading>
              </BoxWrapper>
            </Box>
          </Layer>
        )}
        {this.state.createReferenceModal == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleCreateReference();
            }}
          >
            <Heading>Create Reference</Heading>
            <FormFields>
              <FormField
                help="Enter the name of the reference"
                label="Full Name *"
                htmlFor="name"
                className={styles.formField}
                error={this.state.name_field ? this.state.name_field : ""}
              >
                <input
                  required
                  id="name"
                  name="name"
                  placeholder="Jeff Bezos"
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the title of the reference"
                label="Job Title *"
                htmlFor="name"
                className={styles.formField}
                error={this.state.title_field ? this.state.title_field : ""}
              >
                <input
                  required
                  id="title"
                  name="title"
                  placeholder="CEO"
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the company of the reference"
                label="Company *"
                htmlFor="company"
                className={styles.formField}
                error={this.state.company_field ? this.state.company_field : ""}
              >
                <input
                  required
                  id="company"
                  name="company"
                  placeholder="Amazon"
                  type="text"
                  onChange={e => this.setState({ company: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the avatar of the reference"
                label="Avatar *"
                htmlFor="avatar"
                className={styles.formField}
                error={this.state.avatar_field ? this.state.avatar_field : ""}
              >
                <input
                  required
                  id="avatar"
                  name="avatar"
                  placeholder="https://github.com/octocat"
                  type="text"
                  onChange={e => this.setState({ avatar: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the body of the reference"
                label="Body *"
                htmlFor="body"
                className={styles.formField}
                error={this.state.body_field ? this.state.body_field : ""}
              >
                <textarea
                  required
                  id="body"
                  name="body"
                  type="text"
                  onChange={e => this.setState({ body: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            </FormFields>
            <Footer pad={{ vertical: "medium" }}>
              <Button
                icon={<AddIcon />}
                label="Create"
                onClick={() => this._createReference()}
              />
            </Footer>
          </Layer>
        )}
        {this.state.updateReferenceModal == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleUpdateReference();
            }}
          >
            <Heading>Update Reference</Heading>
            <FormFields>
              <FormField
                help="Enter the name of the reference"
                label="Full Name *"
                htmlFor="name"
                className={styles.formField}
                error={this.state.name_field ? this.state.name_field : ""}
              >
                <input
                  required
                  id="name"
                  name="name"
                  placeholder="Jeff Bezos"
                  defaultValue={this.state.reference.name}
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the title of the reference"
                label="Job Title *"
                htmlFor="name"
                className={styles.formField}
                error={this.state.title_field ? this.state.title_field : ""}
              >
                <input
                  required
                  id="title"
                  name="title"
                  placeholder="CEO"
                  defaultValue={this.state.reference.title}
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the company of the reference"
                label="Company *"
                htmlFor="company"
                className={styles.formField}
                error={this.state.company_field ? this.state.company_field : ""}
              >
                <input
                  required
                  id="company"
                  name="company"
                  placeholder="Amazon"
                  defaultValue={this.state.reference.company}
                  type="text"
                  onChange={e => this.setState({ company: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the avatar of the reference"
                label="Avatar *"
                htmlFor="avatar"
                className={styles.formField}
                error={this.state.avatar_field ? this.state.avatar_field : ""}
              >
                <input
                  required
                  id="avatar"
                  name="avatar"
                  placeholder="https://github.com/octocat"
                  defaultValue={this.state.reference.avatar}
                  type="text"
                  onChange={e => this.setState({ avatar: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Enter the body of the reference"
                label="Body *"
                htmlFor="body"
                className={styles.formField}
                error={this.state.body_field ? this.state.body_field : ""}
              >
                <textarea
                  required
                  id="body"
                  name="body"
                  defaultValue={this.state.reference.body}
                  type="text"
                  onChange={e => this.setState({ body: e.target.value })}
                  className={styles.input}
                />
              </FormField>
            </FormFields>
            <Footer pad={{ vertical: "medium" }}>
              <Button
                icon={<AddIcon />}
                label="Create"
                onClick={() => this._updateReference()}
              />
            </Footer>
          </Layer>
        )}
        {this.state.deleteReferenceToast == true && (
          <Toast status="ok" onClose={() => this.toggleDeleteReferenceToast()}>
            This reference has been deleted.
          </Toast>
        )}
        {this.state.createReferenceToast == true && (
          <Toast status="ok" onClose={() => this.toggleCreateReferenceToast()}>
            This reference has been created.
          </Toast>
        )}
        {this.state.updateReferenceToast == true && (
          <Toast status="ok" onClose={() => this.toggleUpdateReferenceToast()}>
            This reference has been updated.
          </Toast>
        )}
        {this.state.deleteUserToast == true && (
          <Toast status="ok" onClose={() => this.toggleDeleteUserToast()}>
            This user has been deleted.
          </Toast>
        )}
        {this.state.deleteProjectToast == true && (
          <Toast status="ok" onClose={() => this.toggleDeleteProjectToast()}>
            This project has been deleted.
          </Toast>
        )}
      </MainBox>
    );
  }

  _createReference = async function() {
    const { title, name, avatar, body, company } = this.state;
    this.setState({
      reference_id_field: "",
      title_field: "",
      name_field: "",
      avatar_field: "",
      body_field: "",
      company_field: "",
      errors: null
    });
    await this.props
      .createReference({
        variables: {
          title,
          name,
          avatar,
          body,
          company
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
      this.setState({
        reference_id_field: "",
        title_field: "",
        name_field: "",
        avatar_field: "",
        body_field: "",
        company_field: ""
      });
      this.toggleCreateReference();
      this.toggleCreateReferenceToast();
    }
  };

  _updateReference = async function() {
    const { reference_id, title, name, avatar, body, company } = this.state;
    this.setState({
      reference_id_field: "",
      title_field: "",
      name_field: "",
      avatar_field: "",
      body_field: "",
      company_field: ""
    });
    await this.props
      .updateReference({
        variables: {
          reference_id,
          title,
          name,
          avatar,
          body,
          company
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
      this.setState({
        reference_id_field: "",
        title_field: "",
        name_field: "",
        avatar_field: "",
        body_field: "",
        company_field: ""
      });
      this.toggleUpdateReferenceToast();
    }
  };

  _deleteReference = async function() {
    const { reference_id } = this.state;
    this.setState({ reference_id_field: "", errors: false });
    await this.props
      .deleteReference({
        variables: {
          reference_id
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
      this.setState({ reference_id_field: "", errors: false });
      this.toggleDeleteReferenceToast();
    }
  };

  _deleteProject = async function() {
    const { project_id } = this.state;
    this.setState({ project_id_field: "", errors: null });
    await this.props
      .deleteProject({
        variables: {
          project_id
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
      this.setState({ project_id_field: "" });
      this.toggleDeleteProjectToast();
    }
  };

  _deletePost = async function() {
    const { post_id } = this.state;
    this.setState({ post_id_field: "", errors: null });
    await this.props
      .deletePost({
        variables: {
          post_id
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
      this.setState({ post_id_field: "" });
      this.toggleDeletePostToast();
    }
  };

  _deleteUser = async function() {
    const { user_id } = this.state;
    this.setState({ user_id_field: "", errors: null });
    await this.props
      .deleteUser({
        variables: {
          user_id
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
      this.setState({ user_id_field: "" });
      this.toggleDeleteUserToast();
    }
  };
}

const DELETE_USER = gql`
  mutation AdminDeleteUser($user_id: Int!) {
    adminDeleteUser(user_id: $user_id) {
      id
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($project_id: Int!) {
    deleteProject(project_id: $project_id) {
      id
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($post_id: Int!) {
    deletePost(post_id: $post_id) {
      id
    }
  }
`;

const DELETE_REFERENCE = gql`
  mutation DeleteReference($reference_id: Int!) {
    deleteReference(reference_id: $reference_id) {
      id
    }
  }
`;

const CREATE_REFERENCE = gql`
  mutation CreateReference(
    $title: String
    $name: String
    $avatar: String
    $body: String
    $company: String
  ) {
    createReference(
      title: $title
      name: $name
      avatar: $avatar
      body: $body
      company: $company
    ) {
      id
      title
      name
      avatar
      body
      company
    }
  }
`;

const UPDATE_REFERENCE = gql`
  mutation UpdateReference(
    $reference_id: Int!
    $title: String
    $name: String
    $avatar: String
    $body: String
    $company: String
  ) {
    updateReference(
      reference_id: $reference_id
      title: $title
      name: $name
      avatar: $avatar
      body: $body
      company: $company
    ) {
      id
      title
      name
      avatar
      body
      company
    }
  }
`;

const FEED_QUERY_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      admin
      bio
      profile_picture
    }
  }
`;

const FEED_QUERY_REFERENCES = gql`
  query GetReferences {
    getReferences {
      id
      title
      name
      body
      company
      avatar
    }
  }
`;

const FEED_QUERY_INQUIRIES = gql`
  query GetInquiries {
    getInquiries {
      id
      name
      email
      message
      category
    }
  }
`;

const FEED_QUERY_PROJECTS = gql`
  query GetProjects {
    getProjects {
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

const FEED_QUERY_POSTS = gql`
  query GetAdminPosts {
    getAdminPosts {
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

const CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      admin
      profile_picture
    }
  }
`;

const FEED_FEEDBACK = gql`
  query GetFeedback {
    getFeedback {
      id
      title
      body
    }
  }
`;

export default compose(
  graphql(FEED_QUERY_USERS, { name: "getUsers" }),
  graphql(FEED_QUERY_REFERENCES, { name: "getReferences" }),
  graphql(FEED_QUERY_PROJECTS, { name: "getProjects" }),
  graphql(FEED_QUERY_POSTS, { name: "getAdminPosts" }),
  graphql(FEED_FEEDBACK, { name: "getFeedback" }),
  graphql(FEED_QUERY_INQUIRIES, { name: "getInquiries" }),
  graphql(DELETE_PROJECT, { name: "deleteProject" }),
  graphql(DELETE_POST, { name: "deletePost" }),
  graphql(DELETE_USER, { name: "deleteUser" }),
  graphql(CREATE_REFERENCE, { name: "createReference" }),
  graphql(DELETE_REFERENCE, { name: "deleteReference" }),
  graphql(UPDATE_REFERENCE, { name: "updateReference" }),
  graphql(CURRENT_USER, { name: "getUser" })
)(AdminDashboardContainer);
