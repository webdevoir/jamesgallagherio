import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import AdminDashboardContainer from '../index';


describe('<AdminDashboardContainer />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <AdminDashboardContainer />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
