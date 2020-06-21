// Initializes the `questionTemplates` service on path `/question-templates`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { QuestionTemplateServiceClass } from "./question-templates.class";
import hooks from "./question-templates.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "question-templates": QuestionTemplateServiceClass & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get("paginate");

  const options = {
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use(
    "/question-templates",
    new QuestionTemplateServiceClass(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("question-templates");

  service.hooks(hooks);
}
