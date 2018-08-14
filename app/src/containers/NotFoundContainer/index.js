import React, { Component, PropTypes } from "react";
import {
  BrowserRouter,
  Router,
  Route,
  Link,
  RouteHandler,
  browserHistory
} from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Heading from "grommet-udacity/components/Heading";
import Button from "grommet-udacity/components/Button";
import LinkPreviousIcon from "grommet/components/icons/base/LinkPrevious";
import Footer from "grommet-udacity/components/Footer";
import { Divider } from "components";
import { graphql, compose } from "react-apollo";
import styles from "./index.module.scss";
import regeneratorRuntime from "regenerator-runtime";
import createHistory from "history";

// eslint-disable-next-line react/prefer-stateless-function
class NotFoundContainer extends Component {
  render() {
    return (
      <div>
        <Heading tag="h1" align="center" className={styles.heading}>
          Boo! 👻
        </Heading>
        <Heading tag="h3" align="center">
          The contents of this page ran away so we could not serve it to you.
        </Heading>
        <Heading tag="h4" align="center">
          Go back home and continue exploring!
        </Heading>
        <Footer align="center" justify="center" pad="large">
          <Button
            icon={<LinkPreviousIcon />}
            onClick={() => {
              window.history.go(-1);
              return false;
            }}
            label="Go Back"
          />
        </Footer>
      </div>
    );
  }
}

NotFoundContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

export default NotFoundContainer;
