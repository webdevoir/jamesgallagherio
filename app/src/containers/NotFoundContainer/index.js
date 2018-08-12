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

// eslint-disable-next-line react/prefer-stateless-function
class NotFoundContainer extends Component {
  render() {
    return (
      <Box>
        // the web is your canvas and grommet is your paintbrush 🖌
      </Box>
    );
  }
}

NotFoundContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};


export default NotFoundContainer;
