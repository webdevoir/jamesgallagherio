import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import BlogPostContainer from '../index';


describe('<BlogPostContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <BlogPostContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
