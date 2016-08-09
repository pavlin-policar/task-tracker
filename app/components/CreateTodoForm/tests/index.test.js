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

  it('should render a submit button', () => {
    const renderedComponent = shallow(
      <CreateTodoForm onCreateTodo={() => {}} />
    );
    expect(renderedComponent.find('button').length).toEqual(1);
  });

  it('handles adding a new todo', () => {
    const onClickSpy = expect.createSpy();
    const renderedComponent = shallow(
      <CreateTodoForm onCreateTodo={onClickSpy} />
    );
    renderedComponent.find('input').text('Foo');
    renderedComponent.find('button').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });
});
