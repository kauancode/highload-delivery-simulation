import { Router } from "express";

import { createOrder, getOrderById } from "@/controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);

export default router;
