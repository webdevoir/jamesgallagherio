import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Markdown from 'grommet/components/Markdown';
import Section from 'grommet/components/Section';
import EditIcon from 'grommet/components/icons/base/Edit';
import List from 'grommet/components/List';
import Form from 'grommet/components/Form';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';
import ListItem from 'grommet/components/ListItem';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Anchor from 'grommet/components/Anchor';
import DownloadIcon from 'grommet/components/icons/base/Download';
import StarIcon from 'grommet/components/icons/base/Star';
import SearchInput from 'grommet/components/SearchInput';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import CheckBox from 'grommet/components/CheckBox';
import Headline from 'grommet/components/Headline';
import Title from 'grommet/components/Title';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Toast from 'grommet/components/Toast';
import { Divider, LoadingIndicator } from 'components';
import { graphql, compose } from 'react-apollo'
import styles from './index.module.scss';
import gql from 'graphql-tag'
import regeneratorRuntime from "regenerator-runtime";
import messageData from './messageData';
import AUTH_TOKEN from '../../constants.js'

// eslint-disable-next-line react/prefer-stateless-function
class RegisterContainer extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  constructor () {
    super()
    this.state = {
      registerToast: false
    }
  }

  toggleRegisterToast () {
    this.setState({
      registerToast: !this.state.registerToast
    })
  }

  render() {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randomArticle = getRandomInt(0, messageData.length);

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
            JamesGallagher.io
          </Heading>
          <Heading align="center" tag="h5">
            Register
          </Heading>
          <FormFields className={styles.formFields}>
          <FormField
            help="Your full name"
            label="Email *"
            htmlFor="emailInput"
            className={styles.formField}
          >
            <input
              required
              id="nameInput"
              name="name"
              placeholder="Steve Jobs"
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
              className={styles.input}
            />
          </FormField>
            <FormField
              help="Your email address"
              label="Email *"
              htmlFor="emailInput"
              error={this.state.email_field ? this.state.email_field : ""}
              className={styles.formField}
            >
              <input
                required
                id="emailInput"
                name="email"
                placeholder={ messageData[randomArticle].email }
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter a secure password"
              label="Password *"
              htmlFor="passwordInput"
              error={this.state.password_field ? this.state.password_field : ""}
              className={styles.formField}
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
            <FormField
              help="Confirm your password"
              label="Confirm Password *"
              htmlFor="password_confirmationInput"
              className={styles.formField}
              error={this.state.password_confirmation_field ? this.state.password_confirmation_field : ""}
            >
              <input
                required
                name="password_confirmation"
                id="password_confirmationInput"
                type="password"
                onChange={e => this.setState({ password_confirmation: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }} align="center">
            <Button fill label="Submit" primary onClick={() => this._confirm()}/>
          </Footer>
          <Footer align="center" justify="center">
            <span>Have an account? &nbsp;</span>
            <Anchor href='/login'>
              Login
            </Anchor>
          </Footer>
      </Box>
        </Box>
        {this.state.registerToast == true &&
          <Toast status='ok'>
            Your account has been registered. Check your email address for a code.
          </Toast>
        }
      </Section>
    );
  }

  _confirm = async function() {
    const { name, email, password, password_confirmation } = this.state
    this.setState({ email_field: "", password_field: "", password_confirmation_field: "" })
    const result = await this.props.signupMutation({
      variables: {
        name,
        email,
        password,
        password_confirmation
      },
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    if (!this.state.errors) {
      this.toggleRegisterToast()
    }
  }

}

RegisterContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!, $password_confirmation: String!) {
    createUser(name: $name, password_confirmation: $password_confirmation, authProvider: { email: { email: $email, password: $password } }) {
      id
    }
  }
`

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPasswordMutation($email: String!) {
    forgotPassword(email: $email) {
      token
    }
  }
`
export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(FORGOT_PASSWORD_MUTATION, { name: 'forgotPasswordMutation ' })) (RegisterContainer);
