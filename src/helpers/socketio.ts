import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export async function setupSocketIO(expressServer) {
  try {
    io = new Server(expressServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "https://partyeasy.netlify.app",
        // methods: ["GET", "POST"],
      },
    });

  
    io.on("connection", (socket) => {
      //console.log(`User ${socket.id} connected`);

      // Upon connection - only to user
      socket.emit("message", "Welcome to Party Easy Chat Zone!");

    
      // Upon connection - to all others
      socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} connected`)

      // Listening for a message event
      socket.on("message", (data) => {
        console.log(data);
        io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
      });

      // When user disconnects - to all others
      socket.on("disconnect", () => {
        socket.broadcast.emit(
          "message",
          `User ${socket.id.substring(0, 5)}} disconnected`
        );
      });

      // Listen for activity
      socket.on("activity", (name) => {
        socket.broadcast.emit("activity", name);
      });
    });
  } catch (error) {
    console.error(
      "Error during Socket.IO setup:",
      error.stack || error.message
    );
  }
  return io;
}
export { io };

// // authCheck.js
// const { defaultAuth } = require('./firebaseAdmin'); // Import your Firebase admin instance

// const authCheck = async (socket, next) => {
//   try {
//     const token = socket.handshake.auth.token;
//     if (!token) {
//       return next(new Error('Authentication error: No token provided'));
//     }

//     const firebaseUser = await defaultAuth.verifyIdToken(token);
//     console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);

//     socket.user = firebaseUser; // Attach user info to the socket object
//     next();
//   } catch (err) {
//     next(new Error('Authentication error: Invalid or expired token'));
//   }
// };

// module.exports = { authCheck };
// Apply the Middleware to Socket.io:
// Use the io.use method to apply the authCheck middleware to all incoming connections.
// javascript
// Copy code
// const { Server } = require('socket.io');
// const { authCheck } = require('./authCheck');

// const io = new Server(server);

// io.use(authCheck);

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.user);

//   socket.on('message', (data) => {
//     // Handle incoming messages
//     console.log(`Message from ${socket.user.email}:`, data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });