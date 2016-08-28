import PasswordField from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<PasswordField />', () => {
  it('should have an input with type password', () => {
    const renderedComponent = shallow(<PasswordField />);
    expect(renderedComponent.find('input').prop('type')).toEqual('password');
  });
});
