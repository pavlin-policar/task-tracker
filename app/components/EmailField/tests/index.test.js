import EmailField from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<EmailField />', () => {
  it('should have an input with type email', () => {
    const renderedComponent = shallow(<EmailField />);
    expect(renderedComponent.find('input').prop('type')).toEqual('email');
  });
});
