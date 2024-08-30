/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server as HttpServer } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server as SocketIOServer } from 'socket.io';

let server: HttpServer;
let io: SocketIOServer;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // Create an HTTP server using your Express app
    server = new HttpServer(app);

    // Initialize Socket.io and attach it to the HTTP server
    io = new SocketIOServer(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    // Handle Socket.io connections
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('setup',(userData)=>{
        socket.join(userData._id);
        socket.emit('connected')
      })

      socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("user joiined room:" + room)
      })

      socket.on("new message",(newMessageRecieved)=>{
        let chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.users');

        chat.users.forEach((user: { _id: any; }) =>{
          if(user._id == newMessageRecieved.sender._id) return ;
          socket.in(user._id).emit('message recieved', newMessageRecieved);
        })


      })


      // Handle disconnections
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });

    // Start the server
    server.listen(config.port, () => {
      console.log(`Live chat server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection detected, shutting down...', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception detected, shutting down...', err);
  process.exit(1);
});
