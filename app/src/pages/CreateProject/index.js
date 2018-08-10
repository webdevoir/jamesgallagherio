import React from 'react';
import cssModules from 'react-css-modules';
import { CreateProjectContainer } from 'containers';
import styles from './index.module.scss';

const CreateProject = () => (
  <div className={styles.container}>
    <CreateProjectContainer />
  </div>
);

export default cssModules(CreateProject, styles);
