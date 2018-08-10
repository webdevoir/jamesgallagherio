import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import CommentComponent from '../index';

describe('<CommentComponent />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CommentComponent />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
