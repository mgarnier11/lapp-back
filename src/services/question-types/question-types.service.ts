// Initializes the `questionTypes` service on path `/question-types`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { QuestionTypeServiceClass } from './question-types.class';
import hooks from './question-types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'question-types': QuestionTypeServiceClass & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get('paginate');

  const options = {
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/question-types', new QuestionTypeServiceClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('question-types');

  service.hooks(hooks);
}
