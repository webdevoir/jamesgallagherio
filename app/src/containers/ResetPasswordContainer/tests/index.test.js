import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ResetPasswordContainer from '../index';


describe('<ResetPasswordContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ResetPasswordContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
