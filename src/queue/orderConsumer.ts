import type { ConsumeMessage } from "amqplib";

import type { IOrder } from "@/models/Order";

import { getChannel } from "@/config/rabbitmq";
import { processOrder } from "@/workers/orderWorker";

const QUEUE_NAME = "orders_queue";

export const consumeOrders = async () => {
  const channel = getChannel();

  if (!channel) throw new Error("❌ [Queue] Canal não inicializado");

  await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.consume(QUEUE_NAME, (msg: ConsumeMessage | null) => {
    if (msg) {
      const orderData = JSON.parse(msg.content.toString()) as IOrder;

      processOrder(orderData._id.toString())
        .then(() => {
          channel.ack(msg);
        })
        .catch((err: unknown) => {
          console.error("❌ [Queue] Erro ao processar pedido:", err);
          channel.nack(msg, false, true);
        });
    }
  });

  console.log("👷 [Queue] Worker de pedidos iniciado");
};
