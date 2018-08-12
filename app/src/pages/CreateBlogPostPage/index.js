import React from 'react';
import cssModules from 'react-css-modules';
import { CreateBlogPostContainer } from 'containers';
import styles from './index.module.scss';

const CreateBlogPostPage = () => (
  <div className={styles.container}>
    <CreateBlogPostContainer />
  </div>
);

export default cssModules(CreateBlogPostPage, styles);
