const axios = require("axios");

module.exports = {
  fetchRandomRestaurant: async function (userContext) {
    const res = await axios.post("http://localhost:3000/restaurants/random");
    if (!res.data) throw new Error("Nenhum restaurante retornado");

    const restaurant = res.data;
    userContext.vars.restaurantId = restaurant._id || restaurant.id;
    userContext.vars.restaurantProducts = restaurant.products || [];
  },

  setRandomCustomer: function (userContext, events, done) {
    const customers = ["cust1", "cust2", "cust3", "cust4", "cust5"];
    const index = Math.floor(Math.random() * customers.length);
    userContext.vars.customerId = customers[index];
    return done();
  },

  setRandomAddress: function (userContext, events, done) {
    const addresses = [
      "Rua XPTO, 1000",
      "Av. Brasil, 200",
      "Rua das Flores, 321",
      "Rua Central, 50"
    ];
    userContext.vars.address = addresses[Math.floor(Math.random() * addresses.length)];
    return done();
  },
  
  setRandomProducts: function (userContext, events, done) {
    const products = userContext.vars.restaurantProducts || [];
    if (!products.length) return done(new Error("Restaurante sem produtos"));

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * products.length) + 1);
    userContext.vars.items = selected.map(p => ({
      productId: p._id,
      quantity: Math.floor(Math.random() * 3) + 1,
    }));    
    return done();
  },
  checkOrderStatus: function (userContext, events, done) {
    const orderId = userContext.vars.orderId;
    const ORDER_STATUS = ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"]

    if (!orderId) {
      console.warn("⚠️ Nenhum orderId encontrado no contexto");
      return done();
    }

    axios.get(`http://localhost:3000/orders/${orderId}`)
      .then(res => {
        const status = res.data.status;
        if (!status || !ORDER_STATUS.includes(status)) {
          return done(new Error(`Status inválido: ${status}`));
        }
        done();
      })
      .catch(err => {
        console.error("Erro ao buscar status do pedido:", err.message);
        done(err);
      });
  }
};
