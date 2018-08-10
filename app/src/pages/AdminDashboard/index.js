import React from 'react';
import cssModules from 'react-css-modules';
import { AdminDashboardContainer } from 'containers';
import styles from './index.module.scss';

const AdminDashboard = () => (
  <div className={styles.container}>
    <AdminDashboardContainer />
  </div>
);

export default cssModules(AdminDashboard, styles);
