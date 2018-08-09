import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LandingPageLanguages from '../index';

describe('<LandingPageLanguages />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LandingPageLanguages />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
