import React from 'react';
import cssModules from 'react-css-modules';
import { BlogContainer } from 'containers';
import styles from './index.module.scss';

const BlogPage = () => (
  <div className={styles.container}>
    <BlogContainer />
  </div>
);

export default cssModules(BlogPage, styles);
