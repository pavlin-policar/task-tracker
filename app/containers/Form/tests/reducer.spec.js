import expect from 'expect';
import { Map, List } from 'immutable';

import { Form, Field, forms, form, field } from '../reducer';
import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
} from '../actions';


describe('Form reducers', () => {
  describe('Field data type', () => {
    it('should be valid when there are no errors', () => {
      const fieldObj = new Field();
      expect(fieldObj.isValid()).toBe(true);
    });

    it('should be invalid when there are errors', () => {
      const fieldObj = new Field({ errors: List(['error']) });
      expect(fieldObj.isValid()).toBe(false);
    });
  });

  describe('Form data type', () => {
    describe('getData', () => {
      it('should get the data in the fields', () => {
        const formObj = new Form({
          fields: Map({
            foo: new Field({ value: 'foo' }),
            bar: new Field({ value: 'bar' }),
            baz: new Field({ value: 'baz' }),
          }),
        });
        expect(formObj.getData()).toEqual(Map({ foo: 'foo', bar: 'bar', baz: 'baz' }));
      });
    });
    describe('parsingValidators', () => {
      it('should handle multiple validators', () => {
        const result = Form.parseValidators('foo|bar');
        expect(result).toEqual([
          { validator: 'foo', params: [] },
          { validator: 'bar', params: [] },
        ]);
      });

      it('should handle parameters', () => {
        const result = Form.parseValidators('foo:bar,baz|bim:bam');
        expect(result).toEqual([
          { validator: 'foo', params: ['bar', 'baz'] },
          { validator: 'bim', params: ['bam'] },
        ]);
      });

      it('should convert dashes to camel case', () => {
        const result = Form.parseValidators('i-am-a-dash');
        expect(result).toEqual([{ validator: 'iAmADash', params: [] }]);
      });
    });
    describe('validateValue', () => {
      it('should return an array of errors if anything is wrong', () => {
        const formObj = new Form();
        expect(
          formObj.validateValue('21', 'alpha|length:3')
        ).toEqual(['alpha', 'length']);
      });
    });
    describe('isValid', () => {
      it('should be valid if the fields contain no errors', () => {
        const formObj = new Form({ fields: Map({
          one: new Field({ errors: List() }),
          two: new Field({ errors: List() }),
          three: new Field({ errors: List() }),
        }) });
        expect(formObj.isValid()).toBe(true);
      });

      it('should be invalid if the fields contain errors', () => {
        const formObj = new Form({ fields: Map({
          one: new Field({ errors: List(['error']) }),
          two: new Field({ errors: List() }),
          three: new Field({ errors: List() }),
        }) });
        expect(formObj.isValid()).toBe(false);
      });
    });
  });

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

    it('should set its validation string if one is provided', () => {
      const initialState = new Field();
      const state = field(initialState, attachToForm({ validationString: 'required' }));
      expect(state.get('validationString')).toEqual('required');
    });

    it('should not change the default validation string if none is provided', () => {
      const initialState = new Field();
      const expected = initialState.get('validationString');
      const state = field(initialState, attachToForm({ validationString: undefined }));
      expect(state.get('validationString')).toEqual(expected);
    });
  });
});
