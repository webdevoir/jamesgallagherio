import React from 'react';
import cssModules from 'react-css-modules';
import { ProjectOverviewContainer } from 'containers';
import styles from './index.module.scss';

const Projects = () => (
  <div className={styles.container}>
    <ProjectOverviewContainer />
  </div>
);

export default cssModules(Projects, styles);
