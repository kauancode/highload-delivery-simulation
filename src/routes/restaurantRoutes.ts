import { Router } from "express";

import { createRandomRestaurant, createRestaurant, getRestaurantById } from "../controllers/restaurantController";

const router = Router();

router.get("/:id", getRestaurantById);
router.post("/random", createRandomRestaurant);
router.post("/", createRestaurant);

export default router;
