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
import Accordion from 'grommet-udacity/components/Accordion';
import AccordionPanel from 'grommet-udacity/components/AccordionPanel';
import Anchor from 'grommet-udacity/components/Anchor';
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
import { FullSection, MainContent, MainBox, ThumbnailImage, Wrapper } from './styles';
import gql from 'graphql-tag'
import regeneratorRuntime from "regenerator-runtime";
import createHistory from "history"

// eslint-disable-next-line react/prefer-stateless-function
class ResetPasswordContainer extends Component {
  state = {
    password: ''
  }
  constructor () {
    super()
    this.state = {
      resetPasswordToast: false,
      load_default: false,
      email_field: "",
      new_password_field: "",
      new_password_confirmation_field: ""
    }
  }

  toggleResetPasswordToast () {
    this.setState({
      resetPasswordToast: !this.state.resetPasswordToast
    })
  }

  render() {
    if (this.props.verifyUser && this.props.verifyUser.loading) {
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

    if (this.props.verifyUser && this.props.verifyUser.error) {
      return <div>Error</div>
    }

    const currentUser = this.props.verifyUser.verifyResetToken

    if (currentUser) {
      const currentUser = this.props.verifyUser.verifyResetToken[0]
    } else {
      const currentUser = null
    }

    if (this.state.load_default == false) {
      this.setState({
        token: "token", // this.props.params.token,
        load_default: true
      })
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
        <Box
          className={styles.loginForm}
          pad={{ horizontal: 'large' }}
        >
          <Box align="center" justify="center">
            <img
              style={{ maxWidth: 150, height: 'auto' }}
            />
          </Box>
          <Heading strong align="center">
            Open Commit
          </Heading>
          <Heading align="center" tag="h5">
            Reset Password
          </Heading>
          {currentUser != null ? (
            <div>
          <FormFields className={styles.formFields}>
            <FormField
              help="Enter a new secure password for your account"
              label="Password *"
              htmlFor="passwordInput"
              className={styles.formField}
              error={this.state.new_password_field ? this.state.new_password_field : ""}
            >
              <input
                required
                id="new_password"
                name="new_password"
                type="password"
                onChange={e => this.setState({ new_password: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Confirm your password"
              label="Confirm Password *"
              htmlFor="passwordInput"
              className={styles.formField}
              error={this.state.new_password_confirmation_field ? this.state.new_password_confirmation_field : ""}
            >
              <input
                required
                name="password_confirmation"
                id="password_confirmationInput"
                type="password"
                onChange={e => this.setState({ new_password_confirmation: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }} align="center">
            <Button fill label="Submit" primary onClick={() => this._resetPassword()}/>
          </Footer>
          </div>
      ) : (
        <Paragraph>
          This password reset token is invalid. If you still cannot remember your password, please <Anchor to="/login">request another token</Anchor>.
        </Paragraph>
      )}
      </Box>
        </Box>
        {this.state.resetPasswordToast == true &&
          <Toast status='ok' onClose={() => browserHistory.push(`/login`)}>
            Your password has been reset. Redirecting you to the login page.
          </Toast>
        }
      </Section>
    );
  }

  _resetPassword = async function() {
    this.setState({ email_field: "", new_password_field: "", new_password_confirmation_field: "" })
    const { token, new_password, new_password_confirmation } = this.state
    const result = await this.props.resetPassword({
      variables: {
        token,
        new_password,
        new_password_confirmation
      },
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    this.setState({ email_field: "", new_password_field: "", new_password_confirmation_field: "" })
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.toggleResetPasswordToast()
    }
  }

}

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($token: String!, $new_password: String!, $new_password_confirmation: String!) {
    resetPassword(token: $token, new_password: $new_password, new_password_confirmation: $new_password_confirmation) {
      id
    }
  }
`;

const VERIFY_USER = gql`
  query VerifyResetToken($token: String!) {
    verifyResetToken(token: $token) {
      id
      name
      admin
      reviewer
      profile_picture
    }
  }
`;

export default compose(
  graphql(RESET_PASSWORD_MUTATION, { name: 'resetPassword' }),
  graphql(VERIFY_USER, { name: 'verifyUser', options: (params) => ({variables: { token: props.params.id } }) })) (ResetPasswordContainer);
