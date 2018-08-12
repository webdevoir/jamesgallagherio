import React from 'react';
import cssModules from 'react-css-modules';
import { BlogPostContainer } from 'containers';
import styles from './index.module.scss';

const BlogPost = () => (
  <div className={styles.container}>
    <BlogPostContainer />
  </div>
);

export default cssModules(BlogPost, styles);
