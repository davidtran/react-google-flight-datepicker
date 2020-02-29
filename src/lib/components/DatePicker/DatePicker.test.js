import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './DatePicker';

describe('<DatePicker />', () => {
  it('should render', () => {
    const wrapper = shallow(<DatePicker />);

    expect(wrapper).toBeDefined();
  });

  it('should call onClick', () => {
    const props = {
      onClick: jest.fn(),
    };
    const wrapper = shallow(<DatePicker {...props} />);
    wrapper.simulate('click');

    expect(props.onClick).toHaveBeenCalled();
  });

  it('should be disableable', () => {
    const wrapper = shallow(<DatePicker disabled />);

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('should allow custom className', () => {
    const props = {
      className: 'Custom',
    };
    const wrapper = shallow(<DatePicker {...props} />);

    expect(wrapper.hasClass(props.className)).toBe(true);
  });
});
