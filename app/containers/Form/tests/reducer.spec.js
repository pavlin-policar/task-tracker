import expect from 'expect';
import { Map } from 'immutable';

import { Form, Field, forms, form, field } from '../reducer';
import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
} from '../actions';


describe('Form reducers', () => {
  describe('Forms reducer', () => {
    it('should register a new form', () => {
      const initialState = Map({ existing: new Form() });
      const state = forms(initialState, registerForm('newForm'));
      expect(state.has('existing')).toBe(true);
      expect(state.has('newForm')).toBe(true);
      expect(state.get('newForm')).toBeA(Form);
    });

    it('should remove a form', () => {
      const initialState = Map({ one: new Form(), two: new Form() });
      const state = forms(initialState, unregisterForm('two'));
      expect(state.has('one')).toBe(true);
      expect(state.has('two')).toBe(false);
    });
  });

  describe('Form reducer', () => {
    it('should attach a field to the form', () => {
      const initialState = new Form({ fields: Map({ existing: new Field() }) });
      const state = form(initialState, attachToForm({ name: 'newField' }));
      expect(state.hasIn(['fields', 'existing'])).toBe(true);
      expect(state.hasIn(['fields', 'newField'])).toBe(true);
      expect(state.getIn(['fields', 'newField'])).toBeA(Field);
    });

    it('should detach a field from the form', () => {
      const initialState = new Form({ fields: Map({ one: new Field(), two: new Field() }) });
      const state = form(initialState, detachFromForm({ name: 'two' }));
      expect(state.hasIn(['fields', 'one'])).toBe(true);
      expect(state.hasIn(['fields', 'two'])).toBe(false);
    });
  });

  describe('Field reducer', () => {
    it('should set a value', () => {
      const initialState = new Field({ value: 'original' });
      const state = field(initialState, change({ value: 'changed' }));
      expect(state.get('value')).toEqual('changed');
    });
  });
});
