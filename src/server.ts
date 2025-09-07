import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import app from "./app";
import { connectRabbitMQ } from "./config/rabbitmq";
import { setupSockets } from "./config/socket";
import { consumeOrders } from "./queue/orderConsumer";

const PORT = process.env.PORT ?? "3000";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/delivery";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    await connectRabbitMQ();
    await consumeOrders();

    app.listen(PORT, () => {
      console.log(`🚀 [Server] Executando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("❌ [Server] Erro ao iniciar a aplicação", err);
    process.exit(1);
  }
};

setupSockets(io);
await start();

export { io, server };

