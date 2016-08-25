import generateInputField from '../generateInputField';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('generateInputField', () => {
  it('should generate an input type component', () => {
    const Component = generateInputField('text');
    const renderedComponent = shallow(<Component />);
    expect(renderedComponent.find('input').length).toBe(1);
  });

  describe('a simple text component', () => {
    let Component;
    before(() => {
      Component = generateInputField('text');
    });

    it('should have type text', () => {
      const renderedComponent = shallow(<Component />);
      expect(renderedComponent.find('input').prop('type')).toEqual('text');
    });

    it('should adopt the className attribute', () => {
      const renderedComponent = shallow(<Component className="test" />);
      expect(renderedComponent.find('input').hasClass('test')).toBe(true);
    });

    it('should adopt the placeholder attribute', () => {
      const renderedComponent = shallow(<Component placeholder="test" />);
      expect(renderedComponent.find('input').prop('placeholder')).toEqual('test');
    });

    it('should adopt the value attribute', () => {
      const renderedComponent = shallow(<Component value="test" />);
      expect(renderedComponent.find('input').prop('value')).toEqual('test');
    });

    it('should adopt the autoFocus attribute', () => {
      const renderedComponent = shallow(<Component autoFocus />);
      expect(renderedComponent.find('input').prop('autoFocus')).toBe(true);
    });

    it('should adopt the disabled attribute', () => {
      const renderedComponent = shallow(<Component disabled />);
      expect(renderedComponent.find('input').prop('disabled')).toBe(true);
    });

    it('should trigger the onKeyUp property', () => {
      const onKeyUpSpy = expect.createSpy();
      const renderedComponent = shallow(<Component onKeyUp={onKeyUpSpy} />);
      renderedComponent.find('input').simulate('keyUp');
      expect(onKeyUpSpy).toHaveBeenCalled();
    });

    it('should have its initial value set when passed down from props', () => {
      const renderedComponent = shallow(<Component value="test" />);
      expect(renderedComponent.instance().getValue()).toEqual('test');
    });

    it('should change its value when user types things in', () => {
      const renderedComponent = shallow(<Component value="test" />);
      renderedComponent.simulate('change', { target: { value: 'changed' } });
      expect(renderedComponent.instance().getValue()).toEqual('changed');
    });

    it('should clear the value when the clear method is called', () => {
      const renderedComponent = shallow(<Component value="test" />);
      renderedComponent.instance().clear();
      expect(renderedComponent.instance().getValue()).toEqual('');
    });
  });

  describe('a component with additional options', () => {
    let Component;
    before(() => {
      Component = generateInputField('text', {
        validate: 'minLength:3',
        className: 'testClass',
      });
    });

    it('should contain both the passed down class as well as prop class', () => {
      const renderedComponent = shallow(<Component className="propClass" />);
      expect(renderedComponent.find('input').hasClass('testClass')).toBe(true);
      expect(renderedComponent.find('input').hasClass('propClass')).toBe(true);
    });
  });

  describe('component validations', () => {
    let Component;
    before(() => {
      Component = generateInputField('text');
    });

    it('should validate single validations', () => {
      const renderedComponent = shallow(<Component validate="required" />);
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: 'valid' } });
      expect(renderedComponent.instance().isValid()).toBe(true);
    });

    it('should validate initial values', () => {
      const renderedComponent = shallow(<Component validate="required" value="valid" />);
      expect(renderedComponent.instance().isValid()).toBe(true);
    });

    it('should throw for unrecognized validations', () => {
      const renderedComponent = shallow(<Component validate="unrecognized" />);
      expect(() => { renderedComponent.instance().isValid(); }).toThrow();
    });

    it('should handle multiple validations', () => {
      const renderedComponent = shallow(<Component validate="required|alpha" />);
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: '12345' } });
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: 'finally' } });
      expect(renderedComponent.instance().isValid()).toBe(true);
    });

    it('should return an array with the validation errors', () => {
      const renderedComponent = shallow(<Component validate="required|alpha" />);
      expect(renderedComponent.instance().getErrors().length).toBe(1);
    });

    it('should handle validations with one parameter', () => {
      const renderedComponent = shallow(<Component validate="length:5" />);
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: '12345' } });
      expect(renderedComponent.instance().isValid()).toBe(true);
    });

    it('should handle validations with multiple parameters', () => {
      const renderedComponent = shallow(<Component validate="length:3,6" />);
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: '1234567' } });
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: '12345' } });
      expect(renderedComponent.instance().isValid()).toBe(true);
    });

    it('should handle validations with only second parameter', () => {
      const renderedComponent = shallow(<Component validate="length:,3" value="1234" />);
      expect(renderedComponent.instance().isValid()).toBe(false);
      renderedComponent.simulate('change', { target: { value: '123' } });
      expect(renderedComponent.instance().isValid()).toBe(true);
    });
  });
});
