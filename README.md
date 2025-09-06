<div align="center">
  <img src="https://i.imgur.com/dkanm7o.png" alt="Highload Delivery Simulation" />

  # Highload Delivery Simulation  

  Simulação de um **sistema de delivery escalável**, capaz de processar milhares de pedidos, gerenciar filas, cache e enviar notificações em tempo real.  
  Criado para aprendizado e demonstração de **arquitetura distribuída** em Node.js e TypeScript.

  <p align="center">
    <a href="#"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"></a>
    <a href="#"><img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"></a>
  </p>
</div>

---

## Visão Geral

O projeto simula um **sistema de delivery de alta demanda**:

- Recebimento de milhares de pedidos simultâneos.
- Direcionamento de pedidos para o restaurante correto.
- Processamento assíncrono via **filas (RabbitMQ)**.
- Cache de pedidos com **Redis**.
- Notificações em tempo real para clientes e restaurantes via **WebSockets ou SSE**.
- Estrutura preparada para testes de carga e escalabilidade.

O objetivo é demonstrar **arquitetura distribuída, performance e escalabilidade**, utilizando Node.js, TypeScript e MongoDB.

---

## Arquitetura e Estrutura do Projeto

```text
src/
├── config/        # Configurações de DB, Redis e filas
├── controllers/   # Lógica das rotas da API
├── models/        # Schemas MongoDB (Order, Restaurant)
├── routes/        # Rotas Express
├── services/      # Regras de negócio
├── workers/       # Processamento de pedidos em background
├── app.ts         # Configuração do Express
└── server.ts      # Entry point
tests/             # Testes unitários e de integração (Jest + Supertest)
.env.example       # Variáveis de ambiente de exemplo
```

---

## Tecnologias

- **Node.js & TypeScript** – Backend escalável.

- **Express** – Framework HTTP.

- **MongoDB** – Persistência de dados.

- **RabbitMQ** – Filas de processamento assíncrono.

- **Redis** – Cache de status e alta performance.

- **WebSockets / SSE** – Notificações em tempo real.

- **Docker** – Contêinerização.

---

## Referência

Para instruções detalhadas do desafio e como executar o projeto, consulte [**INSTRUCOES.md**](INSTRUCOES.md).
