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
          expect(json.data).toEqual({});
          done();
        });
    });

    it('should include the reponse status in the new object', (done) => {
      // simulate a 400 Bad Request reponse
      const response = new Response(null, { status: 400, statusText: 'Bad Request' });
      window.fetch.returns(Promise.resolve(response));

      request('/resource')
        .then((json) => {
          expect(json.response.status).toBe(400);
          expect(json.response.statusText).toEqual('Bad Request');
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
          expect(json.response.status).toEqual(404);
          expect(json.response.statusText).toEqual('Not Found');
          done();
        });
    });

    it('should not place errors into the data field', (done) => {
      const response = new Response('{"hello":"world"}', {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': 1024,
        },
      });
      window.fetch.returns(Promise.resolve(response));

      request('/thisurliscorrect')
        .then((json) => {
          expect(json.data).toNotExist();
          expect(json.error.hello).toEqual('world');
          done();
        });
    });
  });

  describe('property mapping', () => {
    it('should map properties on objects', () => {
      const mapper = createMapHandler({ URL: { _id: 'id' } })(false);
      const result = mapper('URL', { data: { _id: 1, text: 'Foo' } });
      expect(result).toEqual({ data: { id: 1, text: 'Foo' } });
    });

    it('should map reversed properties on objects', () => {
      const mapper = createMapHandler({ URL: { _id: 'id' } })(true);
      const result = mapper('URL', { data: { id: 1, text: 'Foo' } });
      expect(result).toEqual({ data: { _id: 1, text: 'Foo' } });
    });
  });
});
