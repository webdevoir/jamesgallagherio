import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LandingPageMilestones from '../index';

describe('<LandingPageMilestones />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LandingPageMilestones />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
