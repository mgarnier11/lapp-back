// Initializes the `users` service on path `/users`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { UserServiceClass } from "./users.class";
import hooks from "./users.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    users: UserServiceClass & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get("paginate");

  const options = {
    paginate: false,
    whitelist: ["$regex"],
    events: []
  };

  // Initialize our service with any options it requires
  app.use("/users", new UserServiceClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);
}
