import React, { Component } from "react";
import Box from "grommet-udacity/components/Box";
import List from "grommet-udacity/components/List";
import Heading from "grommet-udacity/components/Heading";
import Tabs from "grommet-udacity/components/Tabs";
import Tab from "grommet-udacity/components/Tab";
import Paragraph from "grommet-udacity/components/Paragraph";
import ListItem from "grommet-udacity/components/ListItem";
import TableRow from "grommet-udacity/components/TableRow";
import Table from "grommet-udacity/components/Table";
import Section from "grommet-udacity/components/Section";
import FormField from "grommet-udacity/components/FormField";
import Footer from "grommet-udacity/components/Footer";
import Image from "grommet-udacity/components/Image";
import Title from "grommet-udacity/components/Title";
import Article from "grommet-udacity/components/Article";
import Anchor from "grommet-udacity/components/Anchor";
import BookIcon from "grommet-udacity/components/icons/base/Book";
import EditIcon from "grommet-udacity/components/icons/base/Edit";
import DashboardIcon from "grommet-udacity/components/icons/base/Dashboard";
import ImageIcon from "grommet-udacity/components/icons/base/Image";
import UserSettingsIcon from "grommet-udacity/components/icons/base/UserSettings";
import ToolsIcon from "grommet-udacity/components/icons/base/Tools";
import DocumentIcon from "grommet-udacity/components/icons/base/Document";
import ArticleIcon from "grommet-udacity/components/icons/base/Article";
import CheckmarkIcon from "grommet-udacity/components/icons/base/Checkmark";
import ComplianceIcon from "grommet/components/icons/base/Compliance";
import LicenseIcon from "grommet/components/icons/base/License";
import Button from "grommet-udacity/components/Button";
import Menu from "grommet-udacity/components/Menu";
import { graphql, compose } from "react-apollo";
import Toast from "grommet-udacity/components/Toast";
import gql from "graphql-tag";
import styles from "./index.module.scss";
import {
  FullSection,
  MainContent,
  MainBox,
  ThumbnailImage,
  Wrapper
} from "./styles";
import cssModules from "react-css-modules";
import { Divider, LoadingIndicator } from "components";
import regeneratorRuntime from "regenerator-runtime";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      updateAccountModal: false,
      load_default: false
    };
  }

  toggleUpdateAccount() {
    this.setState({
      updateAccountModal: !this.state.updateAccountModal
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

    if (this.state.load_default == false) {
      this.setState({
        name: currentUser.name,
        email: currentUser.email,
        profile_picture: currentUser.profile_picture,
        bio: currentUser.bio,
        load_default: true
      });
    }

    return (
      <div>
        <MainBox alignContent="center" fill="horizontal" align="center">
          <FullSection primary direction="row">
            <MainContent
              align="center"
              justify="start"
              pad={{ vertical: "large" }}
            >
              <Heading tag="h2" align="center">
                {`Hello, ${currentUser.name}!`}
              </Heading>
              <div>
                <Title>Account Settings</Title>
                <Section
                  pad={{ vertical: "medium" }}
                  align="center"
                  justify="center"
                >
                  <Box size="medium" align="center">
                    <FormField
                      help="Edit your name"
                      label="Full Name *"
                      htmlFor="name"
                      className={styles.formField}
                      error={this.state.name_field ? this.state.name_field : ""}
                    >
                      <input
                        required
                        id="name"
                        name="name"
                        placeholder="John Appleseed"
                        defaultValue={currentUser.name}
                        type="text"
                        onChange={e => this.setState({ name: e.target.value })}
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Section
                  pad={{ vertical: "medium" }}
                  align="center"
                  justify="center"
                >
                  <Box size="medium" align="center">
                    <FormField
                      help="Edit your profile picture"
                      label="Profile Picture *"
                      htmlFor="profile_picture"
                      className={styles.formField}
                      error={
                        this.state.profile_picture_field
                          ? this.state.profile_picture_field
                          : ""
                      }
                    >
                      <input
                        required
                        id="profile_picture"
                        name="profile_picture"
                        placeholder="https://github.com/joebloggs/profile_image.png"
                        type="text"
                        defaultValue={currentUser.profile_picture}
                        onChange={e =>
                          this.setState({ profile_picture: e.target.value })
                        }
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Section
                  pad={{ vertical: "medium" }}
                  align="center"
                  justify="center"
                >
                  <Box size="medium" align="center">
                    <FormField
                      help="Edit your biography"
                      label="Bio *"
                      htmlFor="bio"
                      className={styles.formField}
                      error={this.state.bio_field ? this.state.bio_field : ""}
                    >
                      <input
                        required
                        id="bio"
                        name="bio"
                        placeholder={`I am ${
                          currentUser.name
                        }, full-stack web dev and lover of cats!`}
                        type="text"
                        defaultValue={currentUser.bio}
                        onChange={e => this.setState({ bio: e.target.value })}
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Section
                  pad={{ vertical: "medium" }}
                  align="center"
                  justify="center"
                >
                  <Box size="medium" align="center">
                    <FormField
                      help="Edit your email"
                      label="Email *"
                      htmlFor="email"
                      className={styles.formField}
                      error={
                        this.state.email_field ? this.state.email_field : ""
                      }
                    >
                      <input
                        required
                        id="email"
                        name="email"
                        placeholder="john@apple.com"
                        defaultValue={currentUser.email}
                        type="email"
                        onChange={e => this.setState({ email: e.target.value })}
                        className={styles.input}
                      />
                    </FormField>
                  </Box>
                </Section>
                <Footer align="center" justify="center">
                  <Menu inline direction="row" responsive={false}>
                    <Button
                      label="Save"
                      primary
                      style={{ marginTop: 10, marginLeft: 5 }}
                      onClick={() => {
                        this._updateAccount();
                      }}
                      icon={<CheckmarkIcon />}
                    />
                  </Menu>
                </Footer>
              </div>
              {this.state.updateAccountModal == true && (
                <Toast status="ok" onClose={() => this.toggleUpdateAccount()}>
                  Your profile has been updated.
                </Toast>
              )}
            </MainContent>
          </FullSection>
        </MainBox>
      </div>
    );
  }

  _updateAccount = async function() {
    const { name, email, bio, profile_picture } = this.state;
    this.setState({
      name_field: "",
      email_field: "",
      bio_field: "",
      profile_picture_field: ""
    });
    await this.props
      .updateUser({
        variables: {
          name,
          email,
          bio,
          profile_picture
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
      this.toggleUpdateAccount();
    }
  };
}

const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String!
    $email: String!
    $profile_picture: String!
    $bio: String!
  ) {
    updateUser(
      name: $name
      email: $email
      profile_picture: $profile_picture
      bio: $bio
    ) {
      id
    }
  }
`;

const CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      admin
      email
      bio
      profile_picture
    }
  }
`;

export default compose(
  graphql(UPDATE_USER, { name: "updateUser" }),
  graphql(CURRENT_USER, { name: "getUser" })
)(ProfileContainer);
