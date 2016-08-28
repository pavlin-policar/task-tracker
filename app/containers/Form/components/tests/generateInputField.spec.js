// import generateInputField from '../generateInputField';
//
// import expect from 'expect';
// import { shallow } from 'enzyme';
// import React from 'react';
//
//
// const shallowWithFormContext = (component) => shallow(
//   component, { context: { form: {
//     id: 'form',
//     attach: () => {},
//     detach: () => {},
//   } } }
// );
//
// describe('generateInputField', () => {
//   it('should generate an input type component', () => {
//     const Component = generateInputField('text');
//     const renderedComponent = shallowWithFormContext(<Component />);
//     console.log(renderedComponent);
//     expect(renderedComponent.find('input').length).toBe(1);
//   });
//
//   describe('a simple text component', () => {
//     let Component;
//     before(() => {
//       Component = generateInputField('text');
//     });
//
//     it('should have type text', () => {
//       const renderedComponent = shallowWithFormContext(<Component />);
//       expect(renderedComponent.find('input').prop('type')).toEqual('text');
//     });
//
//     it('should adopt the className attribute', () => {
//       const renderedComponent = shallowWithFormContext(<Component className="test" />);
//       expect(renderedComponent.find('input').hasClass('test')).toBe(true);
//     });
//
//     it('should adopt the placeholder attribute', () => {
//       const renderedComponent = shallowWithFormContext(<Component placeholder="test" />);
//       expect(renderedComponent.find('input').prop('placeholder')).toEqual('test');
//     });
//
//     it('should adopt the value attribute', () => {
//       const renderedComponent = shallowWithFormContext(<Component value="test" />);
//       expect(renderedComponent.find('input').prop('value')).toEqual('test');
//     });
//
//     it('should adopt the autoFocus attribute', () => {
//       const renderedComponent = shallowWithFormContext(<Component autoFocus />);
//       expect(renderedComponent.find('input').prop('autoFocus')).toBe(true);
//     });
//
//     it('should adopt the disabled attribute', () => {
//       const renderedComponent = shallowWithFormContext(<Component disabled />);
//       expect(renderedComponent.find('input').prop('disabled')).toBe(true);
//     });
//
//     it('should trigger the onKeyUp property', () => {
//       const onKeyUpSpy = expect.createSpy();
//       const renderedComponent = shallowWithFormContext(<Component onKeyUp={onKeyUpSpy} />);
//       renderedComponent.find('input').simulate('keyUp');
//       expect(onKeyUpSpy).toHaveBeenCalled();
//     });
//
//     it('should trigger the onBlur property', () => {
//       const onBlurSpy = expect.createSpy();
//       const renderedComponent = shallowWithFormContext(<Component onBlur={onBlurSpy} />);
//       renderedComponent.find('input').simulate('blur');
//       expect(onBlurSpy).toHaveBeenCalled();
//     });
//
//     it('should have its initial value set when passed down from props', () => {
//       const renderedComponent = shallowWithFormContext(<Component value="test" />);
//       expect(renderedComponent.instance().value).toEqual('test');
//     });
//
//     it('should change its value when user types things in', () => {
//       const renderedComponent = shallowWithFormContext(<Component value="test" />);
//       renderedComponent.simulate('change', { target: { value: 'changed' } });
//       expect(renderedComponent.instance().value).toEqual('changed');
//     });
//
//     it('should clear the value when the clear method is called', () => {
//       const renderedComponent = shallowWithFormContext(<Component value="test" />);
//       renderedComponent.instance().clear();
//       expect(renderedComponent.instance().value).toEqual('');
//     });
//   });
//
//   describe('a component with additional options', () => {
//     let Component;
//     before(() => {
//       Component = generateInputField('text', {
//         validate: 'minLength:3',
//         className: 'testClass',
//       });
//     });
//
//     it('should contain both the passed down class as well as prop class', () => {
//       const renderedComponent = shallowWithFormContext(<Component className="propClass" />);
//       expect(renderedComponent.find('input').hasClass('testClass')).toBe(true);
//       expect(renderedComponent.find('input').hasClass('propClass')).toBe(true);
//     });
//   });
// });
