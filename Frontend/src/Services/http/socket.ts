import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(process.env.REACT_APP_SOCKET_IO_URL ?? '');
