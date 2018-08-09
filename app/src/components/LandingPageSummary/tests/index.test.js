import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import LandingPageSummary from '../index';

describe('<LandingPageSummary />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <LandingPageSummary />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
