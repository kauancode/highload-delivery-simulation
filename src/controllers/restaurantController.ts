import { faker } from "@faker-js/faker";
import { type Request, type Response } from "express";

import Restaurant from "../models/Restaurant";

export async function createRandomRestaurant(req: Request, res: Response) {
  try {
    const products = Array.from({ length: faker.number.int({ max: 6, min: 2 }) }).map(() => ({
      name: faker.food.dish(),
      price: faker.number.float({ fractionDigits: 2, max: 100, min: 5 }),
      productId: faker.string.uuid()
    }));

    const restaurant = new Restaurant({
      address: faker.location.streetAddress(),
      name: faker.company.name(),
      products
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
}

export async function createRestaurant(req: Request, res: Response) {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido" });
    }
  }
}

export async function getRestaurantById(req: Request, res: Response) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: "Restaurante não encontrado" });
    res.json(restaurant);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
}
