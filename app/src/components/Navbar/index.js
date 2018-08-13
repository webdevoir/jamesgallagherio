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
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styles from './index.module.scss';
import { StyledLogo, LogoPlaceholder, Logo } from './styles';
import AUTH_TOKEN from '../../constants'

class Navbar extends Component {
  render() {
    if (this.props.getUser.getCurrentUser) {
      var currentUser = this.props.getUser.getCurrentUser[0]
    } else {
      var currentUser = null
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
              <Anchor href="/" className={this.props.props.location.pathname === "/" ? "navLink active" : "navLink"}>
                Home
              </Anchor>
              <Anchor href="/projects" className={this.props.props.location.pathname === "/projects" ? "navLink active" : "navLink"}>
                Portfolio
              </Anchor>
              <Anchor href="/blog" className={this.props.props.location.pathname === "/blog" ? "navLink active" : "navLink"}>
                Blog
              </Anchor>
              <Anchor href="/about" className={this.props.props.location.pathname === "/about" ? "navLink active" : "navLink"}>
                About
              </Anchor>
            </Menu>
          {currentUser &&
            <Menu
              icon={<Box
                responsive={false}
                direction="row"
                justify="center"
              >
                <img
                  alt="avatar"
                  src={currentUser.profile_picture || <Image height="20" "http://bit.ly/2dqCGdd" />}
                  className={styles.userAvatar}
                />
                <Heading tag="h4" className={styles.profileName}>
                  {currentUser.name}
                </Heading>
              </Box>}
              inline={false}
              colorIndex="neutral-2"
              dropAlign={{ top: 'top', right: 'right' }}
              a11yTitle="Session Menu"
              className={styles.rightMenu}
            >
                <Anchor href="/account/profile">
                  Profile
                </Anchor>
                {currentUser.admin == true &&
                  <Anchor href="/admin/dashboard">
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
      admin
    }
  }
`;

export default compose(
  graphql(CURRENT_USER, { name: 'getUser' })) (Navbar)
