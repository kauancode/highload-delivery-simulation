import { Server } from "socket.io";

export const setupSockets = (io: Server) => {
  io.on("connection", async (socket) => {
    const { customerId, restaurantId } = socket.handshake.query;

    if (customerId) {
      const id = String(customerId);
      await socket.join(`customer:${id}`);
      console.log(`👤 [Socket] Cliente ${id} entrou na sala`);
    }

    if (restaurantId) {
      const id = String(restaurantId);
      await socket.join(`restaurant:${id}`);
      console.log(`🍽️ [Socket] Restaurante ${id} entrou na sala`);
    }

    socket.on("disconnect", () => {
      console.log(`❌ [Socket] Desconectado: ${socket.id}`);
    });
  });
};
