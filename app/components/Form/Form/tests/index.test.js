import Form from '../index';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import TextField from '../../TextField';


describe('<Form />', () => {
  it('should render a form element', () => {
    const renderedComponent = shallow(<Form />);
    expect(renderedComponent.find('form').length).toBe(1);
  });

  it('should adopt the className attribute', () => {
    const renderedComponent = shallow(<Form className="testClass" />);
    expect(renderedComponent.find('form').hasClass('testClass')).toBe(true);
  });

  it('should trigger the onSubmit property', () => {
    const onSubmitSpy = expect.createSpy();
    const renderedComponent = shallow(<Form onSubmit={onSubmitSpy} />);
    renderedComponent.find('form').simulate('submit', { preventDefault: () => {} });
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  describe('rendering a trivial form', () => {
    it('should be able to handle both regular DOM nodes and react components', () => {
      const renderedComponent = shallow(
        <Form>
          <h1>Test</h1>
          <TextField name="test" />
          <TextField />
        </Form>
      );
      expect(renderedComponent.find('h1').length).toBe(1);
      expect(renderedComponent.find('TextField').length).toBe(2);
    });
  });

  describe('interaction with input type components', () => {
    let renderedComponent;
    beforeEach(() => {
      renderedComponent = mount(
        <Form>
          <TextField name="name" value="John" />
          <TextField name="surname" value="Doe" />
          <TextField value="Not tracked" />
        </Form>
      );
    });

    it('should get data from child components with default values', () => {
      expect(renderedComponent.instance().getData()).toEqual({
        name: 'John',
        surname: 'Doe',
      });
    });

    it('should handle data change', () => {
      renderedComponent.find({ name: 'name' })
        .simulate('change', { target: { value: 'Jane' } });
      renderedComponent.find({ name: 'surname' })
        .simulate('change', { target: { value: 'Smith' } });
      expect(renderedComponent.instance().getData()).toEqual({
        name: 'Jane',
        surname: 'Smith',
      });
    });
  });
});
