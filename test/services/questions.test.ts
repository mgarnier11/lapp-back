import assert from 'assert';
import app from '../../src/app';

describe('\'questions\' service', () => {
  it('registered the service', () => {
    const service = app.service('questions');

    assert.ok(service, 'Registered the service');
  });
});
