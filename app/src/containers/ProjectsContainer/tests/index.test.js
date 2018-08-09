import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import ProjectsContainer from '../index';


describe('<ProjectsContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <ProjectsContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
