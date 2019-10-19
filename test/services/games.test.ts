import assert from 'assert';
import expect from 'expect';
import app from '../../src/app';
import { Game } from '../../src/classes/game.class';
import { GameServiceClass } from '../../src/services/games/games.class';

describe("'games' service", async () => {
  let service: GameServiceClass;
  let game: Game;

  before(() => {
    return new Promise((res, rej) => {
      service = app.services.games;

      res();
    });
  });

  it('initialized the service', () => {
    assert.ok(service, 'Initialized the service');
  });

  it('created a game', async () => {
    game = Game.New({
      name: 'test'
    });
    game = await service.create(game);

    assert.equal(game.name, 'test', "Created a new 'test' game");
  });

  it('get a game', async () => {
    let getGame = await service.get(game.id);

    assert.equal(getGame.name, game.name, "Got the created 'test' game");
  });

  it('find a game', async () => {
    let findGames = await service.find({ query: { _id: game.id } });

    assert.equal(findGames[0].name, game.name, "Found the created 'test' game");
  });

  it('update a game', async () => {
    game.name = 'updated';
    let modifiedGame = await service.update(game.id, game);
    assert.equal(
      modifiedGame.name,
      game.name,
      "Modified the 'test' game to 'updated'"
    );
  });

  it('patch a game', async () => {
    game.name = 'patched';
    let patchedGame = await service.patch(game.id, game);

    assert.equal(
      patchedGame.name,
      game.name,
      "Modified the 'updated' game to 'patched'"
    );
  });

  it('remove a game', async () => {
    let removedGame = await service.remove(game.id);

    assert.equal(
      removedGame.id.toString(),
      game.id.toString(),
      "Removed the 'patched' game"
    );
  });
});
