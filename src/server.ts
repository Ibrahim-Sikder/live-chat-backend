import mongoose from 'mongoose';
import config from './app/config';
import { httpServer } from './socket/server';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

<<<<<<< HEAD
    httpServer.listen(config.port, () => {
      console.log(`Techzon server running on port ${config.port}`);
=======
    // Create an HTTP server using your Express app
    server = new HttpServer(app);

    // Initialize Socket.io and attach it to the HTTP server
    io = new SocketIOServer(server, {
      cors: {
        origin: "http://localhost:3000",
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

      socket.on('typing',(room)=>socket.in(room).emit('typing'));
      socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))

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
      console.log(`Techzon server running  ${config.port}`);
>>>>>>> bd5bc69d63bd80cd587f4a470952648143404fb7
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection detected, shutting down...', err);
  if (httpServer) {
    httpServer.close(() => {
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
