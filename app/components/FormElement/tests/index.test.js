import FormElement from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

import TextField from 'components/Form/TextField';


describe('<FormElement />', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = mount(
      <FormElement
        label="First name"
        helpText="Tell us you name"
        inputComponent={
          <TextField
            name="firstName"
            placeholder="First name"
            validate="required"
          />
        }
      />
    );
  });

  it('should render an error when blurred out with invalid value', () => {
    renderedComponent.find('input').simulate('blur');
    expect(renderedComponent.contains('required'));
  });
});
