import TextField from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';


describe('<TextField />', () => {
  it('should adopt the className attribute', () => {
    const renderedComponent = shallow(<TextField className="test" />);
    expect(renderedComponent.find('input').hasClass('test')).toBe(true);
  });

  it('should adopt the value attribute', () => {
    const renderedComponent = shallow(<TextField value="test" />);
    expect(renderedComponent.find('input').prop('value')).toEqual('test');
  });

  it('should adopt the autoFocus attribute', () => {
    const renderedComponent = shallow(<TextField autoFocus />);
    expect(renderedComponent.find('input').prop('autoFocus')).toBe(true);
  });

  it('should adopt the disabled attribute', () => {
    const renderedComponent = shallow(<TextField disabled />);
    expect(renderedComponent.find('input').prop('disabled')).toBe(true);
  });

  it('should trigger the onKeyUp property', () => {
    const onKeyUpSpy = expect.createSpy();
    const renderedComponent = shallow(<TextField onKeyUp={onKeyUpSpy} />);
    renderedComponent.find('input').simulate('keyUp');
    expect(onKeyUpSpy).toHaveBeenCalled();
  });

  it('should have its initial value set when passed down from props', () => {
    const renderedComponent = shallow(<TextField value="test" />);
    expect(renderedComponent.instance().getValue()).toEqual('test');
  });

  it('should change its value when user types things in', () => {
    const renderedComponent = shallow(<TextField value="test" />);
    renderedComponent.simulate('change', { target: { value: 'changed' } });
    expect(renderedComponent.instance().getValue()).toEqual('changed');
  });

  it('should clear the value when the clear method is called', () => {
    const renderedComponent = shallow(<TextField value="test" />);
    renderedComponent.instance().clear();
    expect(renderedComponent.instance().getValue()).toEqual('');
  });
});
