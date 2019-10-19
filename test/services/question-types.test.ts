import assert from 'assert';
import app from '../../src/app';

describe('\'questionTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('question-types');

    assert.ok(service, 'Registered the service');
  });
});
