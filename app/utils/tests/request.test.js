import sinon from 'sinon';
import expect from 'expect';

import request, { createMapHandler } from '../request';


/**
 * Test the request function
 */
describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    sinon.stub(window, 'fetch');
  });

  // After each test, restore the fetch function
  afterEach(() => {
    window.fetch.restore();
  });

  describe('successful responses', () => {
    const goodResponseOptions = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': 1024,
      },
    };

    it('should format the response correctly', (done) => {
      const response = new Response('{"hello":"world"}', goodResponseOptions);
      window.fetch.returns(Promise.resolve(response));

      request('/thisurliscorrect')
        .then((json) => {
          expect(json.data.hello).toEqual('world');
          done();
        });
    });

    it('should handle an empty response body', (done) => {
      // simulate a response to a DELETE request
      const response = new Response(null, { status: 204 });
      window.fetch.returns(Promise.resolve(response));

      request('/resource')
        .then((json) => {
          expect(json.data).toBe(null);
          done();
        });
    });
  });

  describe('error response', () => {
    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      window.fetch.returns(Promise.resolve(res));
    });

    it('should catch errors', (done) => {
      request('/thisdoesntexist')
        .then((json) => {
          expect(json.error.response.status).toEqual(404);
          expect(json.error.response.statusText).toEqual('Not Found');
          done();
        });
    });
  });

  describe('property mapping', () => {
    it('should map properties on objects', () => {
      const mapper = createMapHandler({ URL: { _id: 'id' } })(false);
      const result = mapper('URL', { _id: 1, text: 'Foo' });
      expect(result).toEqual({ id: 1, text: 'Foo' });
    });

    it('should map reversed properties on objects', () => {
      const mapper = createMapHandler({ URL: { _id: 'id' } })(true);
      const result = mapper('URL', { id: 1, text: 'Foo' });
      expect(result).toEqual({ _id: 1, text: 'Foo' });
    });
  });
});
