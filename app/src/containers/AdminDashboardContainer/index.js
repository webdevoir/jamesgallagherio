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

    if (!currentUser) {
      window.location.replace('/login');
    }

    if (currentUser.admin == false) {
      window.location.replace('/dashboard');
    }

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

    const projectsToRender = this.props.getProjects.getProjects
    const usersToRender = this.props.getUsers.getUsers
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
                          onClick={() => this._deleteProject()}/>
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
                              <Button icon={<EditIcon />}
                              onClick={() => this.toggleEditUser()}/>
                              <Button icon={<TrashIcon />}
                              onClick={() => this._deleteUser()}/>
                              <Button icon={<ViewIcon />}
                              onClick={() => this.toggleShowUser()}/>
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
                            onClick={() => this.toggleEditReference()}/>
                            <Button icon={<TrashIcon />}
                            onClick={() => this._deletereference()}/>
                            <Button icon={<ViewIcon />}
                            onClick={() => this.toggleShowReference()}/>
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
        </MainBox>
    );
  }
}

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

export default compose(
  graphql(FEED_QUERY_USERS, { name: 'getUsers' }),
  graphql(FEED_QUERY_REFERENCES, { name: 'getReferences' }),
  graphql(FEED_QUERY_PROJECTS, { name: 'getProjects' })) (AdminDashboardContainer);
