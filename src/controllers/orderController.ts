import { type Request, type Response } from "express";

import redis from '@/config/redis';
import Order from "@/models/Order";

const ORDER_CACHE_TTL = 300;

export async function createOrder(req: Request, res: Response) {
  try {
    const order = new Order(req.body);
    await order.save();
        
    await redis.setex(`order:${order.id as string}`, ORDER_CACHE_TTL, JSON.stringify(order));

    res.status(201).json(order);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido" });
    }
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do pedido é obrigatório" });
    }

    const cachedOrder = await redis.get(`order:${id}`);
    
    if (cachedOrder) {
      console.log("📌 Cache hit!");
      return res.json(JSON.parse(cachedOrder));
    }

    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

    res.json(order);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
}
