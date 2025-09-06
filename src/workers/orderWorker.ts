import { updateOrderStatus } from "@/services/orderService";

export async function processOrder(orderId: string) {
  try {
    const STATUS_FLOW = [
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
    ];

    console.log(`🚚 [Worker] Processando pedido ${orderId}`);

    for (const status of STATUS_FLOW) {
      const delay = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;

      await new Promise((resolve) => setTimeout(resolve, delay));

      await updateOrderStatus(orderId, status);

      console.log(
        `🔄 [Worker] Pedido ${orderId} atualizado para "${status}" (após ${delay.toString()}ms)`
      );
    }
  } catch (err) {
    console.error(
      `❌ [Worker] Erro ao processar pedido: ${(err as Error).message}`
    );
  }
}
