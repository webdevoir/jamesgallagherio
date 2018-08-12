import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import CreateBlogPostContainer from '../index';


describe('<CreateBlogPostContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CreateBlogPostContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
