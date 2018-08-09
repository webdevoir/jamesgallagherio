import React from 'react';
import cssModules from 'react-css-modules';
import { LandingContainer } from 'containers';
import styles from './index.module.scss';

const Projects = () => (
  <div className={styles.container}>
    <LandingContainer />
  </div>
);

export default cssModules(Projects, styles);
