import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import BlogContainer from '../index';


describe('<BlogContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <BlogContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
