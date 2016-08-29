// import EditableText from '../index';
// import keys from 'utils/keyCode';
//
// import expect from 'expect';
// import { shallow, mount } from 'enzyme';
// import React from 'react';
//
// describe('<EditableText />', () => {
//   it('should render a span when editing mode is disabled', () => {
//     const renderedComponent = shallow(<EditableText />);
//     expect(renderedComponent.find('span').length).toBe(1);
//   });
//
//   it('should not render TextField when editing mode is disabled', () => {
//     const renderedComponent = shallow(<EditableText />);
//     expect(renderedComponent.find('TextField').length).toBe(0);
//   });
//
//   it('should render a TextField when editing mode is enabled', () => {
//     const renderedComponent = shallow(<EditableText editing />);
//     expect(renderedComponent.find('TextField').length).toBe(1);
//   });
//
//   it('should not render span when editing mode is enabled', () => {
//     const renderedComponent = shallow(<EditableText editing />);
//     expect(renderedComponent.find('span').length).toBe(0);
//   });
//
//   it('should pass the placeholder prop down to the TextField', () => {
//     const renderedComponent = shallow(<EditableText editing placeholder="test" />);
//     expect(renderedComponent.find('TextField').prop('placeholder')).toEqual('test');
//   });
//
//   it('should pass the defaultClassName prop when editing mode is disabeld', () => {
//     const renderedComponent = shallow(
//       <EditableText defaultClassName="default" activeClassName="active" />
//     );
//     expect(renderedComponent.find('span').hasClass('default')).toBe(true);
//     expect(renderedComponent.find('span').hasClass('active')).toNotBe(true);
//   });
//
//   it('should pass the activeClassName prop when editing mode is enabled', () => {
//     const renderedComponent = shallow(
//       <EditableText defaultClassName="default" activeClassName="active" editing />
//     );
//     expect(renderedComponent.find('TextField').hasClass('active')).toBe(true);
//     expect(renderedComponent.find('TextField').hasClass('default')).toNotBe(true);
//   });
//
//   it('should call onSave when the save method is called', () => {
//     const onSaveSpy = expect.createSpy();
//     const renderedComponent = mount(<EditableText onSave={onSaveSpy} editing />);
//     renderedComponent.instance().save();
//     expect(onSaveSpy).toHaveBeenCalled();
//   });
//
//   it('should call onCancel when the cancel method is called', () => {
//     const onCancelSpy = expect.createSpy();
//     const renderedComponent = mount(<EditableText onCancel={onCancelSpy} editing />);
//     renderedComponent.instance().cancel();
//     expect(onCancelSpy).toHaveBeenCalled();
//   });
//
//   it('should enable the edit mode when clicked on', () => {
//     const renderedComponent = shallow(<EditableText />);
//     renderedComponent.simulate('click');
//     expect(renderedComponent.find('TextField').length).toBe(1);
//     expect(renderedComponent.find('span').length).toBe(0);
//   });
//
//   it('should trigger save when enter is pressed', () => {
//     const onSaveSpy = expect.createSpy();
//     const renderedComponent = mount(<EditableText onSave={onSaveSpy} editing />);
//     renderedComponent.find('TextField').simulate('keyUp', { keyCode: keys.ENTER });
//     expect(onSaveSpy).toHaveBeenCalled();
//   });
//
//   it('should trigger cancel when escape is pressed', () => {
//     const onCancelSpy = expect.createSpy();
//     const renderedComponent = shallow(<EditableText onCancel={onCancelSpy} editing />);
//     renderedComponent.find('TextField').simulate('keyUp', { keyCode: keys.ESCAPE });
//     expect(onCancelSpy).toHaveBeenCalled();
//   });
//
//   it('should disable editing mode when saved', () => {
//     const renderedComponent = mount(<EditableText editing />);
//     renderedComponent.instance().save();
//     expect(renderedComponent.find('TextField').length).toBe(0);
//   });
//
//   it('should disable editing mode when cancelled', () => {
//     const renderedComponent = mount(<EditableText editing />);
//     renderedComponent.instance().cancel();
//     expect(renderedComponent.find('TextField').length).toBe(0);
//   });
//
//   it('should save the text value when saved', () => {
//     const onSaveSpy = expect.createSpy();
//     const renderedComponent = mount(<EditableText onSave={onSaveSpy} editing />);
//     renderedComponent.find('TextField').simulate('change', { target: { value: 'test' } });
//     renderedComponent.instance().save();
//     expect(onSaveSpy).toHaveBeenCalledWith('test');
//   });
//
//   it('should not save the text value when cancelled', () => {
//     const onSaveSpy = expect.createSpy();
//     const renderedComponent = mount(<EditableText onSave={onSaveSpy} editing />);
//     renderedComponent.find('TextField').simulate('change', { target: { value: 'test' } });
//     renderedComponent.instance().cancel();
//     expect(onSaveSpy).toNotHaveBeenCalled();
//   });
// });
