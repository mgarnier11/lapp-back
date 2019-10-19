import assert from 'assert';
import app from '../../src/app';
import { Game } from '../../src/classes/game.class';

describe("'games' service", () => {
  it('registered the service', () => {
    const service = app.service('games');

    assert.ok(service, 'Registered the service');
  });

  it('created a game', async () => {
    const service = app.service('games');

    let newGame = await service.create(
      Game.New({
        name: 'test'
      })
    );

    assert.equal(newGame.name, 'test', "Created a new 'test' game");
  });
});
