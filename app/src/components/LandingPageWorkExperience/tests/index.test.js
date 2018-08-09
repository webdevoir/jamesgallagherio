import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LandingPageWorkExperience from '../index';

describe('<LandingPageWorkExperience />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LandingPageWorkExperience />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
