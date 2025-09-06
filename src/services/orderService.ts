import redis, { DEFAULT_CACHE_TTL } from "@/config/redis";
import Order from "@/models/Order";

export async function updateOrderStatus(orderId: string, status: string) {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!updatedOrder) return null;

  await redis.setex(`order:${updatedOrder._id.toString()}`, DEFAULT_CACHE_TTL, JSON.stringify(updatedOrder));
  return updatedOrder;
}
