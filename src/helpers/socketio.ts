import { Server, Socket } from "socket.io";
import { createServer } from "http";


let io: Server;

export async function setupSocketIO() {
    const server = createServer();

  try {
    
    io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        // methods: ["GET", "POST"],
      },
    });

      io.on("connection", (socket:Socket) => {
          console.log(`User ${socket.id} connected`)
          
          socket.on('message',(data: string) => {
              
              io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
              
          })
           socket.on("disconnect", () => {});
      })
     
      server.listen(3500, () => console.log("listening on port 3500"));
  } catch (error) {
    console.error("Error during Socket.IO setup:", error.stack || error.message);
  }


}

export { io };