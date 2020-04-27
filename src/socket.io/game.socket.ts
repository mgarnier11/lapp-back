import { Application } from "../declarations";

export const gameSocket = (socket: SocketIO.Socket, app: Application) => {
  socket.on("joinGame", (params, cb) => {
    console.log(params);

    if (typeof cb === "function") cb("ok");
  });

  socket.on("leaveGame", (params, cb) => {
    console.log(params);

    if (typeof cb === "function") cb("ok2");
  });
};
