import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      path: '/api/socketio',
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Socket event types
export enum SocketEvents {
  NEW_ENTRY = 'new_entry',
  NEW_COMMENT = 'new_comment',
  NEW_LIKE = 'new_like',
  ENTRY_UPDATED = 'entry_updated',
  COMMENT_UPDATED = 'comment_updated',
  TOPIC_UPDATED = 'topic_updated',
}

// Subscribe to socket events
export const subscribeToEvent = (
  event: SocketEvents,
  callback: (data: unknown) => void
): void => {
  if (socket) {
    socket.on(event, callback);
  }
};

// Unsubscribe from socket events
export const unsubscribeFromEvent = (
  event: SocketEvents,
  callback?: (data: unknown) => void
): void => {
  if (socket) {
    if (callback) {
      socket.off(event, callback);
    } else {
      socket.off(event);
    }
  }
};

// Emit socket events
export const emitEvent = (
  event: SocketEvents,
  data: unknown
): void => {
  if (socket) {
    socket.emit(event, data);
  }
}; 