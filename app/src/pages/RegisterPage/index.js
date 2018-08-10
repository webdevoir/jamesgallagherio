import React from 'react';
import cssModules from 'react-css-modules';
import { RegisterContainer } from 'containers';
import styles from './index.module.scss';

const RegisterPage = () => (
  <div className={styles.container}>
    <RegisterContainer />
  </div>
);

export default cssModules(RegisterPage, styles);
