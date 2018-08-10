import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import CreateProjectContainer from '../index';


describe('<CreateProjectContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <CreateProjectContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
