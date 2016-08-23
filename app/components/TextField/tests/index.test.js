import TextField from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';


describe('<TextField />', () => {
  it('should have an input with type text', () => {
    const renderedComponent = shallow(<TextField />);
    expect(renderedComponent.find('input').prop('type')).toEqual('text');
  });
});
