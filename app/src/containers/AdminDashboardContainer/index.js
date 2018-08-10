import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Box from 'grommet-udacity/components/Box';
import List from 'grommet-udacity/components/List';
import Heading from 'grommet-udacity/components/Heading';
import Tabs from 'grommet-udacity/components/Tabs';
import Tab from 'grommet-udacity/components/Tab';
import Paragraph from 'grommet-udacity/components/Paragraph';
import Section from 'grommet-udacity/components/Section';
import ListItem from 'grommet-udacity/components/ListItem';
import TableRow from 'grommet-udacity/components/TableRow';
import Anchor from 'grommet-udacity/components/Anchor';
import Table from 'grommet-udacity/components/Table';
import BookIcon from 'grommet-udacity/components/icons/base/Book';
import EditIcon from 'grommet-udacity/components/icons/base/Edit';
import DashboardIcon from 'grommet-udacity/components/icons/base/Dashboard';
import ImageIcon from 'grommet-udacity/components/icons/base/Image';
import UserSettingsIcon from 'grommet-udacity/components/icons/base/UserSettings';
import DocumentIcon from 'grommet-udacity/components/icons/base/Document';
import ArticleIcon from 'grommet-udacity/components/icons/base/Article';
import ViewIcon from 'grommet/components/icons/base/View';
import Button from 'grommet-udacity/components/Button';
import Menu from 'grommet-udacity/components/Menu';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './index.module.scss';
import { FullSection, MainContent, MainBox, ThumbnailImage, Wrapper } from './styles';
import cssModules from 'react-css-modules';
import { Divider, LoadingIndicator } from 'components';
import regeneratorRuntime from "regenerator-runtime";

class AdminDashboardContainer extends Component {
  toggleDeleteUserToast () {
    this.setState({
      deleteUserToast: !this.state.deleteUserToast
    })
  }
  toggleDeleteProjectToast () {
    this.setState({
      deleteProjectToast: !this.state.deleteProjectToast
    })
  }
  toggleDeleteReferenceToast () {
    this.setState({
      deleteReferenceToast: !this.state.deleteReferenceToast
    })
  }
  toggleUpdateReferenceToast () {
    this.setState({
      updateReferenceToast: !this.state.updateReferenceToast
    })
  }
  toggleCreateReferenceToast () {
    this.setState({
      createReferenceToast: !this.state.createReferenceToast
    })
  }
  toggleShowReference () {
    this.setState({
      showReferenceToast: !this.state.showReferenceToast
    })
  }
  toggleShowInquiry () {
    this.setState({
      showInquiry: !this.state.showInquiry
    })
  }
  toggleShowUser () {
    this.setState({
      showUser: !this.state.showUser
    })
  }
  render() {
    if (this.props.getUser && this.props.getUser.loading) {
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

    if (this.props.getUser && this.props.getUser.error) {
      return <div>Error</div>
    }

    const currentUser = this.props.getUser.getCurrentUser[0]

    // if (!currentUser) {
    //   window.location.replace('/login');
    // }

    // if (currentUser.admin == false) {
    //   window.location.replace('/');
    // }

    if (this.props.getAllUsers && this.props.getAllUsers.loading) {
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

    if (this.props.getAllUsers && this.props.getAllUsers.error) {
      return <div>Error</div>
    }

    if (this.props.getProjects && this.props.getProjects.loading) {
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

    if (this.props.getProjects && this.props.getProjects.error) {
      return <div>Error</div>
    }

    if (this.props.getUsers && this.props.getUsers.loading) {
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

    if (this.props.getUsers && this.props.getUsers.error) {
      return <div>Error</div>
    }

    if (this.props.getReferences && this.props.getReferences.loading) {
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

    if (this.props.getReferences && this.props.getReferences.error) {
      return <div>Error</div>
    }

    if (this.props.getInquiries && this.props.getInquiries.loading) {
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

    if (this.props.getInquiries && this.props.getInquiries.error) {
      return <div>Error</div>
    }

    const projectsToRender = this.props.getProjects.getProjects
    const usersToRender = this.props.getUsers.getUsers
    const inquiriesToRender = this.props.getInquiries.getInquiries
    const referencesToRender = this.props.getReferences.getReferences

    return (
      <MainBox
        alignContent="center"
        fill="horizontal"
        align="center"
      >
        <FullSection primary direction="row">
              <MainContent
                align="center"
                justify="start"
                pad={{ vertical: 'large' }}
              >
                <Heading align="center">
                  Admin Dashboard
                </Heading>
                <Divider />
                <Box>
                  <Tabs responsive={false}>
                    <Tab title='Projects'>
                    <Box
                      pad="large"
                      className={styles.listWrapper}
                      color="light-2"
                    >
                    <Table>
                      <thead>
                      <tr>
                        <th>
                          Title
                        </th>
                        <th>
                          Status
                        </th>
                        <th>
                          Tags
                        </th>
                        <th>
                          Actions
                        </th>
                      </tr>
                  </thead>
                    <tbody>
                    {projectsToRender.map(project =>
                      <TableRow>
                        <td>
                          {project.title}
                        </td>
                        <td>
                          {project.status}
                        </td>
                        <td>
                          {project.tags}
                        </td>
                        <td>
                          <Button icon={<EditIcon />}
                          href={`/admin/projects/new?slug=${project.slug}`}/>
                          <Button icon={<TrashIcon />}
                          onClick={() => {this._deleteProject(); this.setState({ project_id: project.id })}}/>
                          <Button icon={<ViewIcon />}
                          href={`/projects/${project.slug}`}/>
                        </td>
                        </TableRow>
                        )}
                      </tbody>
                    </Table>
                      </Box>
                    </Tab>
                    <Tab title='Users'>
                    <Box
                      pad="large"
                      className={styles.listWrapper}
                      color="light-2"
                    >
                      <Table>
                        <thead>
                          <tr>
                            <th>
                              Name
                            </th>
                            <th>
                              Email
                            </th>
                            <th>
                              Role
                            </th>
                            <th>
                              Actions
                            </th>
                          </tr>
                      </thead>
                        <tbody>
                        {usersToRender.map(user =>
                          <TableRow>
                            <td>
                              {user.name}
                            </td>
                            <td>
                              {user.email}
                            </td>
                            {user.admin == true &&
                              <td>
                                Admin
                              </td>
                            }
                            {user.admin == false &&
                              <td>
                                User
                              </td>
                            }
                            <td>
                              <Button icon={<TrashIcon />}
                              onClick={() => {this._deleteUser(); this.setState({ user_id: user.id })}}/>
                              <Button icon={<ViewIcon />}
                              onClick={() => {this.toggleShowUser(); this.setState({ user: user })}}/>
                            </td>
                          </TableRow>
                          )}
                        </tbody>
                      </Table>
                      </Box>
                    </Tab>
                    <Tab title='References'>
                    <Box
                      pad="large"
                      className={styles.listWrapper}
                      color="light-2"
                    >
                      <Table>
                        <thead>
                        <tr>
                          <th>
                            Name
                          </th>
                          <th>
                            Title
                          </th>
                          <th>
                            Company
                          </th>
                          <th>
                            Body
                          </th>
                          <th>
                            View
                          </th>
                        </tr>
                    </thead>
                      <tbody>
                      {referencesToRender.map(reference =>
                        <TableRow>
                          <td>
                            {reference.name}
                          </td>
                          <td>
                            {reference.title}
                          </td>
                          <td>
                            {reference.company}
                          </td>
                          <td>
                            {reference.body}
                          </td>
                          <td>
                            <Button icon={<EditIcon />}
                            onClick={() => {this.toggleUpdateReference(); this.setState({ reference: reference })}}/>
                            <Button icon={<TrashIcon />}
                            onClick={() => {this._deleteReference(); this.setState({ reference_id: reference.id })}}/>
                            <Button icon={<ViewIcon />}
                            onClick={() => {this.toggleShowReference(); this.setState({ reference: reference })}}/>
                          </td>
                          </TableRow>
                          )}
                        </tbody>
                      </Table>
                      </Box>
                    </Tab>
                    <Tab title='Inquiries'>
                    <Box
                      pad="large"
                      className={styles.listWrapper}
                      color="light-2"
                    >
                      <Table>
                        <thead>
                        <tr>
                          <th>
                            Name
                          </th>
                          <th>
                            Email
                          </th>
                          <th>
                            Category
                          </th>
                          <th>
                            View
                          </th>
                        </tr>
                    </thead>
                      <tbody>
                      {inquiriesToRender.map(inquiry =>
                        <TableRow>
                          <td>
                            {inquiry.name}
                          </td>
                          <td>
                            {inquiry.email}
                          </td>
                          <td>
                            {inquiry.category}
                          </td>
                          <td>
                            <Button icon={<ViewIcon />}
                            onClick={() => this.toggleShowInquiry()}/>
                          </td>
                          </TableRow>
                          )}
                        </tbody>
                      </Table>
                      </Box>
                    </Tab>
                  </Tabs>
                </Box>
              </MainContent>
              </FullSection>
              {this.state.showReference == true &&
                <Layer overlayClose={true}
                  closer={true} onClose={() => {this.toggleShowReference()}}>
                  <Box
                    size="large"
                    pad="large"
                  >
                    <Heading align="center">
                      {this.state.inquiry.name} - Inquiry
                    </Heading>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Name:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.inquiry.name}
                      </Heading>
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Email:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.inquiry.email}
                      </Heading>
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Category:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.inquiry.category}
                      </Heading>
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Message:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.reference.message}
                      </Heading>
                    </BoxWrapper>
                  </Box>
                </Layer>
              }
              {this.state.showUser == true &&
                <Layer overlayClose={true}
                  closer={true} onClose={() => {this.toggleShowUser()}}>
                  <Box
                    size="large"
                    pad="large"
                  >
                    <Heading align="center">
                      {this.state.user.name} - User Profile
                    </Heading>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Name:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.user.name}
                      </Heading>
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Email:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.user.email}
                      </Heading>
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Role:
                      </Label>
                      {this.state.user.admin == true &&
                        <Heading align="center" tag="h4">
                          Admin
                        </Heading>
                      }
                      {this.state.user.admin == false &&
                        <Heading align="center" tag="h4">
                          User
                        </Heading>
                      }
                    </BoxWrapper>
                    <BoxWrapper>
                      <Label style={{ flex: 1 }}>
                        Avatar:
                      </Label>
                      <Heading align="center" tag="h4">
                        {this.state.user.avatar}
                      </Heading>
                    </BoxWrapper>
                  </Box>
                </Layer>
              }
              {this.state.createReference == true &&
                <Layer overlayClose={true}
                  closer={true} onClose={() => {this.toggleCreateReference()}}>

                <Heading>
                  Create Reference
                </Heading>
                    <FormFields>
                    <FormField
                      help="Email address"
                      label="Collaborator Email *"
                      htmlFor="email"
                      className={styles.formField}
                      error={this.state.email_field ? this.state.email_field : ""}
                    >
                      <input
                        required
                        id="email"
                        name="email"
                        placeholder="jeff@abc.com"
                        type="email"
                        onChange={e => this.setState({ email: e.target.value })}
                        className={styles.input}
                      />
                    </FormField>
                        <FormField label='Permissions *'
                        help="Collaborator permissions"
                        htmlFor="permissions"
                        className={styles.formField}
                        error={this.state.permissions_field ? this.state.permissions_field : ""}>
                        <Select
                        required
                        options={["read", "write", "admin"]}
                        value={this.state.permissions}
                        onChange={event => this.setState({ permissions: event.option })}/>
                      </FormField>
                    </FormFields>
                    <Footer pad={{"vertical": "medium"}}>
                    <Button icon={<AddIcon />}
                    label='Create'
                    onClick={() => this._addCollaborator()}/>
                    </Footer>
              </Layer>
              }
          {this.state.deleteReferenceToast == true &&
            <Toast status='ok' onClose={() => this.toggleDeleteReferenceToast()}>
              This reference has been deleted.
            </Toast>
          }
          {this.state.createReferenceToast == true &&
            <Toast status='ok' onClose={() => this.toggleCreateReferenceToast()}>
              This reference has been created.
            </Toast>
          }
          {this.state.updateReferenceToast == true &&
            <Toast status='ok' onClose={() => this.toggleUpdateReferenceToast()}>
              This reference has been updated.
            </Toast>
          }
          {this.state.deleteUserToast == true &&
            <Toast status='ok' onClose={() => this.toggleDeleteUserToast()}>
              This user has been deleted.
            </Toast>
          }
          {this.state.deleteProjectToast == true &&
            <Toast status='ok' onClose={() => this.toggleDeleteProjectToast()}>
              This project has been deleted.
            </Toast>
          }
        </MainBox>
    );
  }

  _updateReference = async function() {
    const { reference_id,
      title,
      name,
      avatar,
      body,
      company } = this.state
    this.setState({ reference_id_field: "" })
    await this.props.updateReference({
      variables: {
        reference_id,
        title,
        name,
        avatar,
        body,
        company
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ reference_id_field: "",
      title_field: "",
      name_field: "",
      avatar_field: "",
      body_field: "",
      company_field: "" })
      this.toggleUpdateReferenceToast();
    }
  }

  _deleteReference = async function() {
    const { reference_id } = this.state
    this.setState({ reference_id_field: "" })
    await this.props.deleteReference({
      variables: {
        reference_id
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ reference_id_field: "" })
      this.toggleDeleteReferenceToast();
    }
  }

  _deleteProject = async function() {
    const { project_id } = this.state
    this.setState({ project_id_field: "" })
    await this.props.deleteProject({
      variables: {
        project_id
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ project_id_field: "" })
      this.toggleDeleteProjectToast();
    }
  }

  _deleteUser = async function() {
    const { user_id } = this.state
    this.setState({ user_id_field: "" })
    await this.props.deleteUser({
      variables: {
        user_id
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ user_id_field: "" })
      this.toggleDeleteUserToast();
    }
  }

}

const DELETE_USER = gql`
  mutation DeleteUser($user_id: Int!) {
    deleteUser(user_id: $user_id) {
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

const DELETE_REFERENCE = gql`
  mutation DeleteReference($reference_id: Int!) {
    deleteReference(reference_id: $reference_id) {
      id
    }
  }
`;

const UPDATE_REFERENCE = gql`
  mutation UpdateReference($reference_id: Int!, $title: String, $name: String, $avatar: String, $body: String, $company: String) {
    updateReference(reference_id: $reference_id, title: $title, name: $name, avatar: $avatar, body: $body, company: $company) {
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

export default compose(
  graphql(FEED_QUERY_USERS, { name: 'getUsers' }),
  graphql(FEED_QUERY_REFERENCES, { name: 'getReferences' }),
  graphql(FEED_QUERY_PROJECTS, { name: 'getProjects' }),
  graphql(FEED_QUERY_INQUIRIES, { name: 'getInquiries' }),
  graphql(DELETE_PROJECT, { name: 'deleteProject' }),
  graphql(DELETE_USER, { name: 'deleteUser' }),
  graphql(DELETE_REFERENCE, { name: 'deleteReference' }),
  graphql(UPDATE_REFERENCE, { name: 'updateReference' }),
  graphql(CURRENT_USER, { name: 'getUser' })) (AdminDashboardContainer);
