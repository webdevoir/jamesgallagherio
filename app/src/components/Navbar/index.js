// @flow
/* eslint-disable no-alert, no-console */
import React, { Component } from "react";
import { withRouter, browserHistory } from "react-router";
import Header from "grommet-udacity/components/Header";
import Title from "grommet-udacity/components/Title";
import Anchor from "grommet-udacity/components/Anchor";
import Search from "grommet-udacity/components/Search";
import Menu from "grommet-udacity/components/Menu";
import Box from "grommet-udacity/components/Box";
import Layer from "grommet-udacity/components/Layer";
import FormFields from "grommet-udacity/components/FormFields";
import FormField from "grommet-udacity/components/FormField";
import Footer from "grommet-udacity/components/Footer";
import Button from "grommet-udacity/components/Button";
import AddIcon from "grommet-udacity/components/icons/base/Add";
import Heading from "grommet-udacity/components/Heading";
import NoteIcon from "grommet/components/icons/base/Note";
import Notification from "grommet-udacity/components/Notification";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import { StyledLogo, LogoPlaceholder, Logo } from "./styles";
import AUTH_TOKEN from "../../constants";
import regeneratorRuntime from "regenerator-runtime";
const qs = require("query-string");

class Navbar extends Component {
  state = {
    search: qs.parse(location.search).query
  };

  updateSearch(e) {
    this.setState({ search: e.target.value });
    browserHistory.push(`/search?query=${e.target.value}`);
  }

  toggleCreateFeedback() {
    this.setState({
      createFeedbackModal: !this.state.createFeedbackModal
    });
  }

  toggleCreateFeedbackToast() {
    this.setState({
      createFeedbackToast: !this.state.createFeedbackToast
    });
  }

  render() {
    if (this.props.getUser.getCurrentUser) {
      var currentUser = this.props.getUser.getCurrentUser[0];
    } else {
      var currentUser = null;
    }

    return (
      <div>
        <div className={styles.navbar}>
          <Header justify="between" className="component">
            <Title className={styles.title}>
              <Logo
                size="large"
                animation="fadeIn 1.5s ease-out 0.2s"
                url="https://github.com/jamesgallagher432/cdn/blob/master/brand/linkedin_banner_image_1.png?raw=true"
              />
            </Title>
            {currentUser != null && (
              <div>
                {currentUser.confirmed == false && (
                  <Notification
                    status="warning"
                    message="Please verify your email address before continuing"
                  />
                )}
              </div>
            )}
            <Menu
              direction="row"
              align="center"
              responsive
              className={styles.leftMenu}
            >
              <Anchor
                href="/"
                className={
                  this.props.props.location.pathname === "/"
                    ? "navLink active"
                    : "navLink"
                }
              >
                Home
              </Anchor>
              <Anchor
                href="/projects"
                className={
                  this.props.props.location.pathname === "/projects" ||
                  this.props.props.routes[1].path == "/projects/:slug"
                    ? "navLink active"
                    : "navLink"
                }
              >
                Portfolio
              </Anchor>
              <Anchor
                href="/blog"
                className={
                  this.props.props.location.pathname === "/blog" ||
                  this.props.props.routes[1].path == "/blog/:slug"
                    ? "navLink active"
                    : "navLink"
                }
              >
                Blog
              </Anchor>
              <Anchor
                href="/about"
                className={
                  this.props.props.location.pathname === "/about"
                    ? "navLink active"
                    : "navLink"
                }
              >
                About
              </Anchor>
              <Search
                placeHolder="Search"
                value={this.state.search}
                onDOMChange={e => {
                  this.updateSearch(e);
                }}
              />
            </Menu>
            <Anchor
              icon={<NoteIcon />}
              onClick={() => this.toggleCreateFeedback()}
            />
            {currentUser && (
              <div>
                <Menu
                  icon={
                    <Box responsive={false} direction="row" justify="center">
                      <img
                        alt="avatar"
                        src={
                          currentUser.profile_picture || "http://bit.ly/2dqCGdd"
                        }
                        className={styles.userAvatar}
                      />
                      <Heading tag="h4" className={styles.profileName}>
                        {currentUser.name}
                      </Heading>
                    </Box>
                  }
                  inline={false}
                  colorIndex="neutral-2"
                  dropAlign={{ top: "top", right: "right" }}
                  a11yTitle="Session Menu"
                  className={styles.rightMenu}
                >
                  <Anchor href="/account/profile">Profile</Anchor>
                  {currentUser.admin == true && (
                    <Anchor href="/admin/dashboard">Administration</Anchor>
                  )}
                  <Anchor
                    onClick={() => {
                      sessionStorage.removeItem(AUTH_TOKEN);
                      window.location.replace("/login");
                    }}
                  >
                    Logout
                  </Anchor>
                </Menu>
              </div>
            )}
            {!currentUser && (
              <div>
                <Menu
                  direction="row"
                  align="center"
                  responsive
                  className={styles.rightMenu}
                >
                  <Anchor
                    href="/register"
                    className={
                      this.props.props.location.pathname === "/register"
                        ? "navLink active"
                        : "navLink"
                    }
                  >
                    Register
                  </Anchor>
                  <Anchor
                    href="/login"
                    className={
                      this.props.props.location.pathname === "/login"
                        ? "navLink active"
                        : "navLink"
                    }
                  >
                    Login
                  </Anchor>
                </Menu>
              </div>
            )}
          </Header>
        </div>

        {this.state.createFeedbackModal == true && (
          <Layer
            overlayClose={true}
            closer={true}
            onClose={() => {
              this.toggleCreateFeedback();
            }}
          >
            <Heading align="center">Submit Feedback</Heading>
            <Title tag="h5" align="center">
              Thank you for submitting your feedback. It helps me improve this
              website.
            </Title>
            <FormFields>
              <FormField
                help="What is the subject of your feedback?"
                label="Title *"
                htmlFor="title"
                className={styles.formField}
                error={this.state.title_field ? this.state.title_field : ""}
              >
                <input
                  required
                  id="title"
                  name="title"
                  placeholder="Bug on Portfolio Page"
                  type="text"
                  onChange={e => this.setState({ title: e.target.value })}
                  className={styles.input}
                />
              </FormField>
              <FormField
                help="Describe the feedback or feature request you have for the site, or the issue you have experienced."
                label="Description *"
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
                onClick={() => this._createFeedback()}
              />
            </Footer>
          </Layer>
        )}
        {this.state.createFeedbackToast == true && (
          <Toast status="ok" onClose={() => this.toggleCreateFeedbackToast()}>
            Thanks for your feedback!
          </Toast>
        )}
      </div>
    );
  }

  _createFeedback = async function() {
    const { title, body } = this.state;
    this.setState({ title_field: "", body_field: "", errors: false });
    await this.props.createFeedback({
        variables: {
          title,
          body
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
      this.setState({ title_field: "", body_field: "", errors: false });
      this.toggleCreateFeedback();
      this.toggleSubmitFeedbackToast();
    }
  };
}

const CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      admin
    }
  }
`;

const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($title: String!, $body: String!) {
    createFeedback(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export default compose(
  graphql(
    CURRENT_USER,
    { name: "getUser" }
  ),
  graphql(CREATE_FEEDBACK, { name: "createFeedback" })
)(Navbar);
