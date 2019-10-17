// Initializes the `roles` service on path `/roles`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RoleServiceClass } from './roles.class';
import hooks from './roles.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    roles: RoleServiceClass & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get('paginate');

  const options = {
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/roles', new RoleServiceClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('roles');

  service.hooks(hooks);
}
