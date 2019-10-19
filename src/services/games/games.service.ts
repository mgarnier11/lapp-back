// Initializes the `games` service on path `/games`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GameServiceClass } from './games.class';
import hooks from './games.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    games: GameServiceClass & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get('paginate');

  const options = {
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/games', new GameServiceClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('games');

  service.hooks(hooks);
}
