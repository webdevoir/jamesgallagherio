import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ProjectOverviewContainer from '../index';


describe('<ProjectOverviewContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ProjectOverviewContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
