// Initializes the `questions` service on path `/questions`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Questions } from './questions.class';
import hooks from './questions.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    questions: Questions & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get('paginate');

  const options = {
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/questions', new Questions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('questions');

  service.hooks(hooks);
}
