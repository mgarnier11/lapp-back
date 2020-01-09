import assert from 'assert';
import app from '../../src/app';

describe('\'gameTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('game-types');

    assert.ok(service, 'Registered the service');
  });
});
