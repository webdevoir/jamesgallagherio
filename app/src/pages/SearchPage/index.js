import React from 'react';
import cssModules from 'react-css-modules';
import { SearchContainer } from 'containers';
import styles from './index.module.scss';

const SearchPage = () => (
  <div className={styles.container}>
    <SearchContainer />
  </div>
);

export default cssModules(SearchPage, styles);
