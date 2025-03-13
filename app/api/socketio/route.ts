import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiResponse } from 'next';

// Store the socket.io server instance
let io: SocketIOServer | null = null;

export async function GET(req: NextRequest, res: NextApiResponse) {
  if (!io) {
    // Create a new socket.io server if one doesn't exist
    const httpServer: NetServer = (res as any).socket.server;
    io = new SocketIOServer(httpServer, {
      path: '/api/socketio',
      addTrailingSlash: false,
    });

    // Socket.io event handlers
    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle new entry events
      socket.on('new_entry', (data) => {
        socket.broadcast.emit('new_entry', data);
      });

      // Handle new comment events
      socket.on('new_comment', (data) => {
        socket.broadcast.emit('new_comment', data);
      });

      // Handle new like events
      socket.on('new_like', (data) => {
        socket.broadcast.emit('new_like', data);
      });

      // Handle entry update events
      socket.on('entry_updated', (data) => {
        socket.broadcast.emit('entry_updated', data);
      });

      // Handle comment update events
      socket.on('comment_updated', (data) => {
        socket.broadcast.emit('comment_updated', data);
      });

      // Handle topic update events
      socket.on('topic_updated', (data) => {
        socket.broadcast.emit('topic_updated', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  // Return a response to keep the connection alive
  return new Response('Socket.io server is running', {
    status: 200,
  });
} 