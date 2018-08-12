import React from 'react';
import cssModules from 'react-css-modules';
import { BlogPostContainer } from 'containers';
import styles from './index.module.scss';

const BlogPost = (props) => (
  <div className={styles.container}>
    <BlogPostContainer {...props} />
  </div>
);

export default cssModules(BlogPost, styles);
