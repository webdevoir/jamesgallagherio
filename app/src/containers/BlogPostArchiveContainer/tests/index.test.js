import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import BlogPostArchiveContainer from '../index';


describe('<BlogPostArchiveContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <BlogPostArchiveContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
