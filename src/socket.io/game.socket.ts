import { Application } from "../declarations";

interface Params {
  gameId: string;
}

const getGameRoomName = (gameId: string) => `game:${gameId}`;

export const gameSocket = (socket: SocketIO.Socket, app: Application) => {
  console.log(`${socket.id} connected`);

  socket.on("joinGame", (params: Params, cb) => {
    console.log(`${socket.id} joined game room : ${params.gameId}`);

    socket.join(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok");
  });

  socket.on("startGame", async (params: Params, cb) => {
    const game = await app.services.games.get(params.gameId);
    const questions = await app.services.questions.find({
      query: {
        typeId: {
          $in: game.questionTypes.map((qT) => qT.id?.toString()),
        },
      },
    });

    // try {
    //   game.actualQuestion =
    //     questions[Math.floor(Math.random() * questions.length)];
    // } catch (error) {}
  });

  socket.on("answerQuestion", () => {});

  socket.on("leaveGame", (params: Params, cb) => {
    console.log(`${socket.id} left game room : ${params.gameId}`);

    socket.leave(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok2");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};
