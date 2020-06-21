import { User } from "../classes/user.class";

interface SocketExtension {
  user: User;
}

export type MySocket = SocketIO.Socket & SocketExtension;
