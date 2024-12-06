import { Server as SocketIOServer } from 'socket.io';
import * as http from 'http';
import app from '../app';

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // Adjust as needed
    methods: ['GET', 'POST']
  }
});

// Track connected users
const users: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Store user socket mapping
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    users[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(users));
  }

  // Handle new messages
  socket.on('new message', (messageData) => {
    const receiverSocketId = users[messageData.receiverId];
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message received', messageData);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const disconnectedUserId = Object.keys(users).find(
      (user) => users[user] === socket.id
    );

    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      io.emit('getOnlineUsers', Object.keys(users));
    }
  });
});

export { httpServer };