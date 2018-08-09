import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import SocialIcon from '../index';

describe('<SocialIcon />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <SocialIcon />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
