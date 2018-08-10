import React from 'react';
import cssModules from 'react-css-modules';
import { ResetPasswordContainer } from 'containers';
import styles from './index.module.scss';

const ResetPassword = () => (
  <div className={styles.container}>
    <ResetPasswordContainer />
  </div>
);

export default cssModules(ResetPassword, styles);
