import { Application } from "../declarations";
import users from "./users/users.service";
import roles from "./roles/roles.service";
import questionTypes from "./question-types/question-types.service";
import questions from "./questions/questions.service";
import games from "./games/games.service";
import gameTypes from "./game-types/game-types.service";

// Don't remove this comment. It's needed to format import lines nicely.

export default function(app: Application) {
  app.configure(roles);
  app.configure(users);
  app.configure(questionTypes);
  app.configure(questions);
  app.configure(games);
  app.configure(gameTypes);
}
