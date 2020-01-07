import logger from "./logger";
import app from "./app";
import { Game } from "./classes/game.class";
import { User } from "./classes/user.class";
import { Role } from "./classes/role.class";

const port = app.get("port");
const server = app.listen(port);

let notLoggedUser = User.New({
  name: "notLoggedUser",
  email: "notLogged@lapp.com",
  password: "LaP@t@t3",
  gender: 0
});
let userRole = Role.New({
  name: "user",
  icon: "",
  permissionLevel: 0
});

process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at: Promise ", p, reason);
});

server.on("listening", () => {
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  );

  const roleService = app.services.roles;
  const userService = app.services.users;

  let roleReady = false;
  let userReady = false;

  async function initDb() {
    roleService
      .find({ query: { name: userRole.name } })
      .then(async foundRoles => {
        userRole =
          foundRoles.length === 0
            ? await roleService.create(userRole)
            : foundRoles[0];

        userService
          .find({ query: { name: notLoggedUser.name } })
          .then(async foundUsers => {
            notLoggedUser =
              foundUsers.length === 0
                ? await userService.create(notLoggedUser)
                : foundUsers[0];
          });
      })
      .catch(err => console.log(err));
  }

  roleService.evtEmt.once("ready", () => {
    roleReady = true;
    if (userReady) initDb();
  });

  userService.evtEmt.once("ready", () => {
    userReady = true;
    if (roleReady) initDb();
  });
});
