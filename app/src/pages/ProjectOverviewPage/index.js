import React from 'react';
import cssModules from 'react-css-modules';
import { ProjectOverviewContainer } from 'containers';
import styles from './index.module.scss';

const Projects = (props) => (
  <div className={styles.container}>
    <ProjectOverviewContainer {...props} />
  </div>
);

export default cssModules(Projects, styles);
