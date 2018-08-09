import React from 'react';
import cssModules from 'react-css-modules';
import { ContactContainer } from 'containers';
import styles from './index.module.scss';

const ContactPage = () => (
  <div className={styles.container}>
    <ContactContainer />
  </div>
);

export default cssModules(ContactPage, styles);
