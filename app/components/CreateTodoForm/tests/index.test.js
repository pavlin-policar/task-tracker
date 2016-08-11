import CreateTodoForm from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<CreateTodoForm />', () => {
  it('should render a form element', () => {
    const renderedComponent = shallow(
      <CreateTodoForm onCreateTodo={() => {}} />
    );
    expect(renderedComponent.find('form').length).toEqual(1);
  });
});
