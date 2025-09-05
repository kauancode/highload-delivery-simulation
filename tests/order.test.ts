import request from "supertest";

import app from "../src/app";
import "../tests/setup";

interface OrderResponse {
  _id: string;
  customerId: string;
  items: { productId: string; quantity: number }[];
  restaurantId: string;
  status: string;
}

interface RestaurantResponse {
  _id: string;
  address: string;
  name: string;
  products: { name: string; price: number; productId: string }[];
}

describe("Order API", () => {
  let restaurantId: string;
  let orderId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post("/restaurants")
      .send({
        address: "Rua dos Testes, 123",
        name: "Restaurante Teste",
        products: [{ name: "Produto Teste", price: 10, productId: "prod-1" }]
      }) as request.Response;

    const body = res.body as RestaurantResponse;
    restaurantId = body._id;
  });

  it("should create an order", async () => {
    const res = await request(app)
      .post("/orders")
      .send({
        customerId: "cust001",
        items: [{ productId: "prod-1", quantity: 2 }],
        restaurantId
      }) as request.Response;

    const body = res.body as OrderResponse;
    expect(res.status).toBe(201);
    expect(body._id).toBeDefined();
    expect(body.status).toBe("RECEIVED");
    orderId = body._id;
  });

  it("should get an order by id", async () => {
    const res = await request(app).get(`/orders/${orderId}`) as request.Response;
    const body = res.body as OrderResponse;

    expect(res.status).toBe(200);
    expect(body._id).toBe(orderId);
    expect(body.customerId).toBe("cust001");
  });
});
