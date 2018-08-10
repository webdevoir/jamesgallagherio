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
import messageData from './messageData';
import AUTH_TOKEN from '../../constants'

// eslint-disable-next-line react/prefer-stateless-function
class LoginContainer extends Component {

  constructor () {
    super()
    this.state = {
      forgotPasswordModal: false,
      loggedInToast: false,
      email: '',
      password: '',
      forgot_email: ''
    }
  }

  toggleForgotPassword () {
    this.setState({
      forgotPasswordModal: !this.state.forgotPasswordModal
    })
  }

  toggleLoggedInToast () {
    this.setState({
      loggedInToast: !this.state.loggedInToast
    })
  }

  toggleForgotPasswordToast () {
    this.setState({
      forgotPasswordToast: !this.state.forgotPasswordToast
    })
  }

  toggleErrorToast () {
    this.setState({
      errorToast: !this.state.errorToast
    })
  }

  toggleVerifyToast () {
    this.setState({
      verifyToast: !this.state.verifyToast
    })
  }

  componentDidMount() {
    const storedToken = window.location.href.match(/\?verify_token=(.*)/) &&
    window.location.href.match(/\?verify_token=(.*)/)[1];;
    if (storedToken) {
      this.setState({
        token: storedToken
      });
      var token = String(storedToken)
      this.props.verifyUser({
        variables: {
          token
        }
      }).catch(res => {
        const errors = res.graphQLErrors.map(error => error);
        this.setState({ errors });
      });
      if (this.state.errors) {
        {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
        if (this.state.notification) {
          this.toggleNotificationToast()
        }
      }
      if (!this.state.errors) {
        this.toggleVerifyToast();
      }
      return;
    }
  }

  render() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const randomEmail = getRandomInt(0, messageData.length);

    if (sessionStorage.getItem(AUTH_TOKEN)) {
      window.location.replace('/dashboard');
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
            Login
          </Heading>
          <FormFields className={styles.formFields}>
            <FormField
              help="Enter the email you used to create your account"
              label="Email *"
              htmlFor="emailInput"
              className={styles.formField}
              error={this.state.email_field ? this.state.email_field : ""}
            >
              <input
                required
                id="emailInput"
                name="email"
                placeholder={ messageData[randomEmail].email }
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter the password you used to create your account"
              label="Password *"
              htmlFor="passwordInput"
              className={styles.formField}
              error={this.state.password_field ? this.state.password_field : ""}
            >
              <input
                required
                name="password"
                id="passwordInput"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }} align="center">
            <Button fill label="Submit" type="submit" primary onClick={() => this._confirm()} />
          </Footer>
          <Footer align="center" justify="center">
            <span>Need an account? &nbsp;</span>
            <Anchor href='/register'>
              Register
            </Anchor>
          </Footer>
          <Footer align="center" justify="center">
            <Anchor onClick={() => {this.toggleForgotPassword()}}>
              Forgot Password
            </Anchor>
          </Footer>
      </Box>
        </Box>
        {this.state.forgotPasswordModal == true &&
          <Layer overlayClose={true}
            closer={true}
            onClose={() => {this.toggleForgotPassword()}}>
              <Header>
                <Heading>
                  Forgot Password
                </Heading>
              </Header>
              <Paragraph>
                Type in the email associated with your account. We will send you an email with a link you can use to reset your password.
                </Paragraph>
              <FormFields>
                <FormField
                label='Email Address *'
                className={styles.formField}
                help='Enter your email address'>
                <input
                  required
                  name="forgot_email"
                  id="forgot_emailInput"
                  type="email"
                  onChange={e => this.setState({ forgot_email: e.target.value })}
                  className={styles.input}
                />
                </FormField>
              </FormFields>
              <Footer pad={{"vertical": "medium"}}>
                <Button label='Submit'
                  type='submit'
                  primary={true}
                  onClick={() => this._forgotPassword()} />
              </Footer>
          </Layer>
        }
        {this.state.verifyToast == true &&
          <Toast status='ok' onClose={() => this.toggleVerifyToast()}>
            Your account has been verified. Please sign into your account.
          </Toast>
        }
        {this.state.loggedInToast == true &&
          <Toast status='ok' onClose={() => browserHistory.push(`/dashboard`)}>
            You have been logged in. Redirecting you to the Dashboard.
          </Toast>
        }
        {this.state.forgotPasswordToast == true &&
          <Toast status='ok' onClose={() => this.toggleForgotPasswordToast()}>
            We have sent you a password reset link.
          </Toast>
        }
        {this.state.errorToast &&
          <Toast status="critical" onClose={() => this.toggleErrorToast()}>
            Your email or password is incorrect.
          </Toast>
        }
        {this.state.notificationToast &&
          <Toast status="critical" onClose={() => this.toggleNotificationToast()}>
            Your password reset token is invalid.
          </Toast>
        }
      </Section>
    );
  }

  _confirm = async function() {
    const { email, password } = this.state
    this.setState({ email_field: null, password_field: null, errors: null })
    const result = await this.props.loginMutation({
      variables: {
        email,
        password
      },
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
      if (this.state.errors) {
        this.toggleErrorToast()
      }
    }
    if (!this.state.errors) {
      var token = result.data.signinUser.token;
      this._saveUserData(token)
      this.toggleLoggedInToast()
    }
  }

  _saveUserData = token => {
    sessionStorage.setItem(AUTH_TOKEN, token)
    console.log(token)
  }

  _forgotPassword = async function() {
    const { forgot_email } = this.state
    await this.props.forgotPasswordMutation({
      variables: {
        forgot_email
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.toggleForgotPassword()
      this.toggleForgotPasswordToast()
    }
  }

}

LoginContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const VERIFY_MUTATION = gql`
  mutation VerifyUserMutation($token: String!) {
    verifyUser(token: $token) {
      id
    }
  }
`


const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPasswordMutation($forgot_email: String!) {
    forgotPassword(email: $forgot_email) {
      id
    }
  }
`;


export default compose(
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
  graphql(VERIFY_MUTATION, { name: 'verifyUser' }),
  graphql(FORGOT_PASSWORD_MUTATION, { name: 'forgotPasswordMutation' })) (LoginContainer);
