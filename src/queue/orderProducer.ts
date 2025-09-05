
import type { IOrder } from "@/models/Order";

import { getChannel } from "@/config/rabbitmq";

const QUEUE_NAME = "orders_queue";

export const publishOrder = async (order: IOrder) => {
  const channel = getChannel();
  
  if (!channel) throw new Error("❌ [RabbitMQ] Canal não inicializado");

  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(order)), {
    persistent: true,
  });

  console.log(`[Queue] Pedido enviado para fila: ${order._id.toString()}`);
};
