import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LogoImage from '../index';

describe('<LogoImage />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LogoImage />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
