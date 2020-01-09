// Initializes the `gameTypes` service on path `/game-types`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { GameTypes } from './game-types.class';
import hooks from './game-types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'game-types': GameTypes & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/game-types', new GameTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('game-types');

  service.hooks(hooks);
}
