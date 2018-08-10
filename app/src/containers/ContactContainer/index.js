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
class ContactContainer extends Component {
  constructor () {
    super()
    this.state = {
      formSubmitted: false
    }
  }

  toggleFormSubmitted () {
    this.setState({
      formSubmitted: !this.state.formSubmitted
    })
  }

  render() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const randomEmail = getRandomInt(0, messageData.length);
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
            Contact Me
          </Heading>
          <Heading align="center" tag="h5">
            Use the form below if you want to chat
          </Heading>
          <FormFields className={styles.formFields}>
            <FormField
              help="Enter your full name"
              label="Name *"
              htmlFor="nameInput"
              className={styles.formField}
              error={this.state.name_field ? this.state.name_field : ""}
            >
              <input
                required
                id="nameInput"
                name="name"
                placeholder={`John Doe`}
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
                className={styles.input}
              />
            </FormField>
            <FormField
              help="Enter your email"
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
            <FormField label='Category *' help='What is your message about?'
            className={styles.formField}
            error={this.state.category_field ? this.state.category_field : ""}>
              <Select
              required
              options={['Employment Opportunities', 'General Questions', 'Suggestion', 'Something Else']}
              value={this.state.category}
              onChange={event => this.setState({ category: event.option })}/>
            </FormField>
            <FormField
              help="What do you want to say?"
              label="Message *"
              htmlFor="emailInput"
              className={styles.formField}
              error={this.state.message_field ? this.state.message_field : ""}
            >
              <textarea
                required
                id="messageInput"
                name="message"
                type="text"
                onChange={e => this.setState({ message: e.target.value })}
                className={styles.input}
              />
            </FormField>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }} align="center">
            <Button fill label="Submit" type="submit" primary onClick={() => this._submitForm()} />
          </Footer>

          {this.state.formSubmitted == true &&
            <Toast status='ok' onClose={() => this.toggleFormSubmitted()}>
              Your inquiry has been submitted.
            </Toast>
          }
          </Box>
      </Box>
      </Section>
    );
  }

  _submitForm = async function() {
    const { name, email, message, category } = this.state
    this.setState({ name_field: "", email_field: "", message_error: "", category_error: ""})
    await this.props.submitContact({
      variables: {
        name,
        email,
        message,
        category
      }
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error);
      this.setState({ errors });
    });
    if (this.state.errors) {
      {this.state.errors.map(error => this.setState({ [error.field]: error.message }))}
    }
    if (!this.state.errors) {
      this.setState({ name_field: "", email_field: "", message_error: "", category_error: ""})
      this.toggleFormSubmitted();
    }
  }
}

const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContact($name: String!, $email: String!, $message: String!, $category: String!) {
    submitContact(name: $name, email: $email, email: $message, email: $category) {
      id
      name
      email
      message
      category
    }
  }
`;


export default compose(
  graphql(SUBMIT_CONTACT_FORM, { name: 'submitContact' })) (ContactContainer);
