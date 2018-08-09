import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LandingPageHero from '../index';

describe('<LandingPageHero />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LandingPageHero />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
