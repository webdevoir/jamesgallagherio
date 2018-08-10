// @flow
/* eslint-disable no-alert, no-console */
import React, { Component } from 'react'
import Header from 'grommet-udacity/components/Header';
import Title from 'grommet-udacity/components/Title';
import Anchor from 'grommet-udacity/components/Anchor';
import Search from 'grommet-udacity/components/Search';
import Menu from 'grommet-udacity/components/Menu';
import Box from 'grommet-udacity/components/Box';
import Heading from 'grommet-udacity/components/Heading';
import AddIcon from 'grommet-udacity/components/icons/base/Add';
import Notification from 'grommet-udacity/components/Notification';
import LogoImage from './logo.png';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './index.module.scss';
import { StyledLogo, LogoPlaceholder } from './styles';
import AUTH_TOKEN from '../../constants'

class Navbar extends Component {
  render() {
    if (this.props.getUser.getCurrentUser) {
      const currentUser = this.props.getUser.getCurrentUser[0]
    } else {
      var currentUser = null
    }
    return (
      <div>
      <div className={styles.navbar}>
        <Header justify="between" className="component">
          <Title className={styles.title}>
            {typeof window !== 'undefined' ?
              <StyledLogo src={LogoImage} alt="logo" />
            :
              <LogoPlaceholder />
            }
          </Title>
          {currentUser != null &&
            <div>
              {currentUser.confirmed == false &&
                <Notification status="warning"
                message='Please verify your email address before continuing' />
              }
            </div>
          }
            <Menu
              direction="row"
              align="center"
              responsive
              className={styles.leftMenu}
              >
              <Anchor href="/projects">
                Projects
              </Anchor>
              <Anchor href="/about">
                About
              </Anchor>
              <Anchor href="/contact">
                Contact
              </Anchor>
            </Menu>
          {currentUser &&
            <Box
            id="session-menu-toggle"
            responsive={false}
            direction="row"
            justify="center"
          >
              <Menu
                a11yTitle="Session"
                inline={false}
                className={styles.rightMenu}
                label={currentUser.name}
                >
                <Anchor href="/profile">
                  Profile
                </Anchor>
                {currentUser.admin == true &&
                  <Anchor href="/admin">
                    Administration
                  </Anchor>
                }
                <Anchor onClick={() => {
                  sessionStorage.removeItem(AUTH_TOKEN);
                  window.location.replace('/login');
                }}>
                  Logout
                </Anchor>
              </Menu>
            </Box>
          }
          {!currentUser &&
            <div>
            <Menu
              direction="row"
              align="center"
              responsive
              className={styles.rightMenu}
              >
              <Anchor href="/register">
                Register
              </Anchor>
              <Anchor href="/login">
                Login
              </Anchor>
              </Menu>
            </div>
          }
        </Header>
      </div>
      </div>
    );
  }
}

const CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
    }
  }
`;

export default compose(
  graphql(CURRENT_USER, { name: 'getUser' })) (Navbar)
