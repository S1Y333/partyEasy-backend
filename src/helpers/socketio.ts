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
      console.log(`User ${socket.id} connected`);

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
