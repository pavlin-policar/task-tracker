import Button from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';


describe('<Button />', () => {
  it('should render the text in the button', () => {
    const renderedComponent = shallow(<Button>Click me!</Button>);
    expect(renderedComponent.contains('Click me!')).toBe(true);
  });

  it('should adopt the className property', () => {
    const renderedComponent = shallow(<Button className="foo" />);
    expect(renderedComponent.find('button').hasClass('foo')).toBe(true);
  });

  it('should pass down any other properties to button', () => {
    const renderedComponent = shallow(<Button disabled />);
    expect(renderedComponent.find('button').prop('disabled')).toBe(true);
  });
});
