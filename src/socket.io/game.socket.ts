import * as Jwt from "jsonwebtoken";
import { Params as FeathersParams } from "@feathersjs/feathers";

import { Application } from "../declarations";
import { MySocket } from "./types";
import { User } from "../classes/user.class";
import { Score } from "../classes/score.class";
import { GameStatus } from "../classes/game.class";

interface Params {
  gameId: string;
  jwt: string;
}

export enum MySocketErrors {
  JwtNotDefined,
  UserNotDefined,
}

const getGameRoomName = (gameId: string) => `game:${gameId}`;

export const gameSocket = (
  socket: MySocket,
  app: Application,
  io: SocketIO.Server
) => {
  const getAuthParams = async (jwt: string): Promise<FeathersParams> => {
    if (!socket.user) {
      if (jwt) {
        let payload = await app.services.authentication.verifyAccessToken(jwt);

        let user = await app.services.users.get(payload.sub);

        if (user) {
          socket.user = user;

          return {
            authenticated: true,
            authentication: {
              strategy: "jwt",
              accessToken: jwt,
              payload: payload,
            },
            user: user,
          };
        } else {
          throw MySocketErrors.UserNotDefined;
        }
      } else {
        throw MySocketErrors.JwtNotDefined;
      }
    } else {
      return socket.user;
    }
  };

  console.log(`${socket.id} connected`);

  socket.on("game:join", async (params: Params, cb) => {
    const authParams = await getAuthParams(params.jwt);

    console.log(`${socket.id} joined game room : ${params.gameId}`);

    socket.join(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok");
  });

  socket.on("game:start", async (params: Params, cb) => {
    const authParams = await getAuthParams(params.jwt);

    io.to(getGameRoomName(params.gameId)).emit("game:loading", true);

    const game = await app.services.games.get(params.gameId);

    const questions = await app.services.questions.find({
      query: {
        typeId: {
          $in: game.questionTypes.map((qT) => qT.id?.toString()),
        },
      },
    });

    try {
      game.actualQuestion =
        questions[Math.floor(Math.random() * questions.length)];

      game.actualTurn = 1;

      game.scores = game.allUsers.map((u) => {
        return Score.New({ score: 0, userId: u.id?.toString() });
      });
      game.status = GameStatus.started;

      const startedGame = await app.services.games.patch(
        game.id,
        game,
        authParams
      );
      // io.to(getGameRoomName(params.gameId)).emit("game:loading", false);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("game:answerQuestion", () => {});

  socket.on("game:leave", async (params: Params, cb) => {
    const authParams = await getAuthParams(params.jwt);

    console.log(`${socket.id} left game room : ${params.gameId}`);

    socket.leave(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok2");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};
