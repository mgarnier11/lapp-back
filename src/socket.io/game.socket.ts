import * as Jwt from "jsonwebtoken";
import { Params as FeathersParams } from "@feathersjs/feathers";

import { Application } from "../declarations";
import { MySocket } from "./types";
import { User } from "../classes/user.class";
import { Score } from "../classes/score.class";
import { GameStatus, Game } from "../classes/game.class";
import { Question } from "../classes/question.class";

interface BaseParams {
  gameId: string;
  jwt: string;
}

interface AnswerQuestionParams {
  // userId: string;
  // questionId: string;
  answer: boolean;
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
  const getQuestions = (game: Game): Promise<Question[]> => {
    return app.services.questions.find({
      query: {
        typeId: {
          $in: game.questionTypes.map((qT) => qT.id?.toString()),
        },
      },
    });
  };

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

  socket.on("game:join", async (params: BaseParams, cb) => {
    const authParams = await getAuthParams(params.jwt);

    console.log(`${socket.id} joined game room : ${params.gameId}`);

    socket.join(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok");
  });

  socket.on("game:start", async (params: BaseParams, cb) => {
    const authParams = await getAuthParams(params.jwt);

    io.to(getGameRoomName(params.gameId)).emit("game:loading", true);

    const game = await app.services.games.get(params.gameId);

    const questions = await getQuestions(game);

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

  socket.on(
    "game:answerQuestion",
    async (params: BaseParams & AnswerQuestionParams) => {
      const authParams = await getAuthParams(params.jwt);

      io.to(getGameRoomName(params.gameId)).emit("game:loading", true);

      const game = await app.services.games.get(params.gameId);
      const playingPlayer = game.getActualplayer();

      console.log(
        `${socket.id} answered ${params.answer} to question ${game.actualQuestion.id} for user ${playingPlayer.id}`
      );

      console.log(game.scores);

      game.scores = game.scores.map((s) => {
        if (s.userId === playingPlayer.id?.toString()) {
          s.score += params.answer ? game.actualQuestion.difficulty : 0;
        }
        return s;
      });

      if (game.actualTurn >= game.nbTurns) {
        game.status = GameStatus.finished;
      } else {
        game.actualTurn++;

        const questions = await getQuestions(game);

        game.actualQuestion =
          questions[Math.floor(Math.random() * questions.length)];
      }

      const updatedGame = await app.services.games.patch(
        game.id,
        game,
        authParams
      );
    }
  );

  socket.on("game:leave", async (params: BaseParams, cb) => {
    const authParams = await getAuthParams(params.jwt);

    console.log(`${socket.id} left game room : ${params.gameId}`);

    socket.leave(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok2");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};
