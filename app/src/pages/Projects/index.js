import React from 'react';
import cssModules from 'react-css-modules';
import { ProjectsContainer } from 'containers';
import styles from './index.module.scss';

const Projects = () => (
  <div className={styles.container}>
    <ProjectsContainer />
  </div>
);

export default cssModules(Projects, styles);
