import type { Channel, ConsumeMessage } from "amqplib";

import { getChannel } from "@/config/rabbitmq";
import redis, { DEFAULT_CACHE_TTL } from "@/config/redis";
import Order, { type IOrder } from "@/models/Order";

const QUEUE_NAME = "orders_queue";

async function processOrder(msg: ConsumeMessage, channel: Channel) {
  try {
    const orderData = JSON.parse(msg.content.toString()) as IOrder;
    console.log(`📦 [Queue] Processando pedido: ${orderData._id.toString()}`);

    const updatedOrder = await Order.findByIdAndUpdate(
      orderData._id,
      { status: "PREPARING" },
      { new: true }
    );

    if (updatedOrder) {
      await redis.setex(
        `order:${updatedOrder._id.toString()}`,
        DEFAULT_CACHE_TTL,
        JSON.stringify(updatedOrder)
      );
      console.log(`♻️ [Queue] Cache atualizado: ${updatedOrder._id.toString()}`);
    }

    channel.ack(msg);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("❌ [Queue] Erro ao processar pedido:", error.message);
    channel.nack(msg, false, true);
  }
}

export const consumeOrders = async () => {
  const channel = getChannel();
  if (!channel) throw new Error("❌ [RabbitMQ] Canal não inicializado");

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  await channel.consume(QUEUE_NAME, (msg: ConsumeMessage | null) => {
    if (msg) void processOrder(msg, channel);
  });

  console.log("👷 [Queue] Worker de pedidos iniciado");
};
