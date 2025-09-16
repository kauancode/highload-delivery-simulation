# Instruções do Desafio – Highload Delivery Simulation

Este documento detalha as informações de arquitetura e teste do sistema de delivery escalável, com seus endpoints e fluxos de trabalho.

---

### Índice
1. [Objetivo do desafio](#1-objetivo-do-desafio)
2. [Requisitos técnicos](#2-requisitos-técnicos)
3. [Modelos de dados](#3-modelos-de-dados)
4. [Endpoints](#4-endpoints)
    - 4.1 [Criar Pedido](#41-criar-pedido)
    - 4.2 [Consultar Status](#42-consultar-status-do-pedido)
    - 4.3 [Atualização de Status](#43-atualização-de-status-pelo-worker)
5. [Notificações](#5-notificações-em-tempo-real)
6. [Teste de carga](#6-teste-de-carga)

---

## 1. Objetivo do Desafio

- Criar um sistema que **receba milhares de pedidos simultâneos**.
- Direcione cada pedido para o restaurante correto.
- Atualize e cacheie o status do pedido em tempo real.
- Notifique clientes e restaurantes via **WebSocket ou SSE**.

---

## 2. Requisitos Técnicos

- **Node.js (Express)** – API backend.
- **MongoDB** – Armazena pedidos e restaurantes.
- **RabbitMQ / Redis** – Filas e cache.
- **WebSockets / SSE** – Notificações em tempo real.
- **Docker** – Contêineres para serviços.

---

## 3. Modelos de Dados

## Restaurante

| Campo      | Tipo    | Descrição                       |
|-----------|--------|---------------------------------|
| `_id`      | `string` | Identificador único do restaurante |
| `name`    | `string` | Nome do restaurante             |
| `address` | `string` | Endereço completo do restaurante |
| `products`| `array`  | Lista de produtos disponíveis   |

### Exemplo de Restaurante
```json
{
  "_id": "resto123",
  "name": "Pizza da Esquina",
  "address": "Rua das Pizzas, 101",
  "products": [
    { "productId": "pizza-1", "name": "Pizza Mussarela", "price": 50 },
    { "productId": "drink-7", "name": "Refrigerante", "price": 8 }
  ]
}
```

---

## Pedido

| Campo         | Tipo     | Descrição                        |
|--------------|---------|----------------------------------|
| `_id`         | `string` | Identificador único do pedido    |
| `customerId`  | `string` | ID do cliente que fez o pedido   |
| `restaurantId`| `string` | ID do restaurante               |
| `items`       | `array`  | Lista de produtos e quantidades |
| `status`      | `string` | Status atual do pedido           |
| `createdAt`   | `string` | Timestamp de criação             |
| `updatedAt`   | `string` | Timestamp da última atualização  |

### Exemplo de Pedido
```json
{
  "_id": "order123",
  "customerId": "cust001",
  "restaurantId": "resto123",
  "items": [
    { "productId": "pizza-1", "quantity": 2 }
  ],
  "status": "RECEIVED",
  "createdAt": "2025-09-04T10:30:00Z",
  "updatedAt": "2025-09-04T10:32:00Z"
}
```

---

## 4. Endpoints

### 4.1. Criar Pedido

- **Endpoint:** `POST /orders`  
- **Descrição:** Cria um novo pedido.

#### Parâmetros de Requisição (Body)
| Campo         | Tipo     | Descrição                        |
|--------------|---------|----------------------------------|
| `customerId`  | string  | ID do cliente                    |
| `restaurantId`| string  | ID do restaurante                |
| `items`       | array   | Lista de produtos e quantidades  |
| - `productId` | string  | ID do produto                    |
| - `quantity`  | number  | Quantidade do produto            |
| `address`     | string  | Endereço de entrega              |

#### Body de Exemplo
```json
{
  "customerId": "cust001",
  "restaurantId": "resto123",
  "items": [
    { "productId": "pizza-1", "quantity": 2 },
    { "productId": "drink-7", "quantity": 1 }
  ],
  "address": "Rua XPTO, 1000"
}
```

#### Fluxo de Processamento
1. Valida se os itens pertencem ao restaurante.  
2. Cria o pedido no MongoDB (status = RECEIVED).  
3. Publica o pedido na fila do restaurante.  
4. Dispara notificação em tempo real para o restaurante.  

---

### 4.2. Consultar Status do Pedido

- **Endpoint:** `GET /orders/:id`  
- **Descrição:** Consulta o status de um pedido.

#### Fluxo de Consulta
1. Busca status no cache Redis.  
2. Fallback para MongoDB se não encontrado.  
3. Retorna status atual do pedido.  

---

### 4.3. Atualização de Status pelo Worker

**Descrição:**
Um worker processa as atualizações de status dos pedidos de forma assíncrona, simulando o fluxo real de preparação e entrega. Ele garante que cada pedido tenha seu status atualizado no banco de dados e em cache, além de notificar clientes em tempo real.

**Status do pedido**
| Status             | Descrição                        |
|--------------------|----------------------------------|
| `PREPARING`        | Pedido está sendo preparado      |
| `OUT_FOR_DELIVERY	`| Pedido saiu para entrega         |
| `DELIVERED`        | Pedido foi entregue ao cliente   |


**Fluxo do Worker**
1. Consome a fila do restaurante;

2. O **worker** recebe o orderId do pedido que precisa ser processado;

3. Atualiza status do pedido;

4. Para cada pedido, ele percorre uma sequência de status:

> ```PREPARING → OUT_FOR_DELIVERY → DELIVERED```
> <br>Entre cada atualização, há um **delay aleatório**  entre 3 e 8 segundos, simulando o tempo real de preparação e entrega.

5. Atualiza o pedido no **MongoDB**;

6. Atualiza o Redis **(cache rápido)** para refletir o novo status;

7. Dispara **notificação em tempo real**;
> Sempre que um status é atualizado, o sistema pode enviar notificações para clientes ou dashboards, mantendo todos informados sobre o andamento do pedido.

*Exemplo de log do worker*
```bash
🚚 [Worker] Processando pedido 12345
🔄 [Worker] Pedido 12345 atualizado para "PREPARING" (após 4321ms)
🔄 [Worker] Pedido 12345 atualizado para "OUT_FOR_DELIVERY" (após 6789ms)
🔄 [Worker] Pedido 12345 atualizado para "DELIVERED" (após 3456ms)
```

**Observações importantes**

O worker é **assíncrono**, garantindo que múltiplos pedidos possam ser processados em paralelo.<br>
Qualquer erro durante a atualização é capturado e logado, evitando que o processamento de outros pedidos seja interrompido.
> *O delay aleatório ajuda a simular o tempo real de entrega, tornando os testes mais realistas.*

---

## 5. Notificações em tempo real

**Descrição:** Os clientes **(usuários ou restaurantes)** recebem atualizações de status dos pedidos em tempo real via WebSocket.

**Fluxo das Notificações**

#### 1. Conexão do Cliente

O cliente se conecta diretamente ao servidor **Socket.IO**, enviando **query params**:

- **Clientes:** `customerId`
- **Restaurantes:** `restaurantId`

O servidor cria salas específicas para cada usuário:

- **Clientes:** `customer:{customerId}`
- **Restaurantes:** `restaurant:{restaurantId}`

> Isso garante que cada usuário receba apenas notificações relevantes.

##### 2. Recebendo Notificações

Sempre que o status de um pedido é atualizado (**updateOrderStatus**):

1. O pedido é atualizado no **MongoDB**.
2. O **cache** é atualizado no **Redis**.
3. O evento `orderUpdated` é emitido para a sala do cliente correspondente:

```javascript
io.to(`customer:${updatedOrder.customerId}`).emit("orderUpdated", updatedOrder);
Todos os clientes conectados na sala recebem imediatamente a atualização.
```


---

## 6. Teste de Carga
  - **Pedidos simultâneos:** Simular milhares de pedidos em diferentes restaurantes.
  - **Consultas de status:** Simular consultas frequentes do status do pedido.
