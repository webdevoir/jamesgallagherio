import React from 'react';
import cssModules from 'react-css-modules';
import { BlogPostArchiveContainer } from 'containers';
import styles from './index.module.scss';

const BlogPostArchive = () => (
  <div className={styles.container}>
    <BlogPostArchiveContainer />
  </div>
);

export default cssModules(BlogPostArchive, styles);
