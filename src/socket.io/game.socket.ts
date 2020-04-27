import { Application } from "../declarations";

const getGameRoomName = (gameId: string) => `game:${gameId}`;

export const gameSocket = (socket: SocketIO.Socket, app: Application) => {
  console.log(`${socket.id} connected`);

  socket.on("joinGame", (params, cb) => {
    console.log(`${socket.id} joined game room : ${params.gameId}`);

    socket.join(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok");
  });

  socket.on("answerQuestion", () => {});

  socket.on("leaveGame", (params, cb) => {
    console.log(`${socket.id} left game room : ${params.gameId}`);

    socket.leave(getGameRoomName(params.gameId));

    if (typeof cb === "function") cb("ok2");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
};
