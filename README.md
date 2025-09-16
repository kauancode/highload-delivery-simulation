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
├── config/        # Configurações do RabbitMQ, Redis e Socket
├── controllers/   # Lógica das rotas da API
├── models/        # Schemas MongoDB (Order, Restaurant)
├──queue/          # Envio e cosnumo das mensagens das filas de pedidos
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

- **[Node.js](https://nodejs.org/)** & **[TypeScript](https://www.typescriptlang.org/)** – Backend escalável.
- **[Express](https://expressjs.com/pt-br/)** – Framework HTTP.
- **[MongoDB](https://www.mongodb.com/docs/)** – Persistência de dados.
- **[RabbitMQ](https://www.rabbitmq.com/documentation.html)** – Filas de processamento assíncrono.
- **[Redis](https://redis.io/docs/)** – Cache de status e alta performance.
- **[Socket.io](https://socket.io/docs/)** – Notificações em tempo real.
- **[Docker](https://docs.docker.com/)** – Contêinerização.

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
├── config/        # Configurações do RabbitMQ, Redis e Socket
├── controllers/   # Lógica das rotas da API
├── models/        # Schemas MongoDB (Order, Restaurant)
├── queue/         # Envio e consumo das mensagens das filas de pedidos
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

- **[Node.js](https://nodejs.org/)** & **[TypeScript](https://www.typescriptlang.org/)** – Backend escalável.
- **[Express](https://expressjs.com/pt-br/)** – Framework HTTP.
- **[MongoDB](https://www.mongodb.com/docs/)** – Persistência de dados.
- **[RabbitMQ](https://www.rabbitmq.com/documentation.html)** – Filas de processamento assíncrono.
- **[Redis](https://redis.io/docs/)** – Cache de status e alta performance.
- **[Socket.io](https://socket.io/docs/)** – Notificações em tempo real.
- **[Docker](https://docs.docker.com/)** – Contêinerização.

---

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://docs.docker.com/) (opcional, para execução via contêiner)
- [RabbitMQ](https://www.rabbitmq.com/download.html) e [Redis](https://redis.io/download) rodando localmente ou via Docker
- MongoDB rodando localmente ou via Docker

---

### 1. Executando Localmente (Node.js + TypeScript)

1. Clone o repositório:
```bash
git clone <REPO_URL>
cd highload-delivery-simulation
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Ajuste os valores conforme necessário (`MONGO_URI`, `REDIS_URL`, `RABBITMQ_URL`, etc.).

4. Inicie o projeto em modo desenvolvimento:
```bash
npm run dev
```

5. Acesse a API via `http://localhost:3000` (ou a porta configurada no `.env`).

---

### 2. Executando com Docker

Como você já possui um `DOCKERFILE` no repositório, basta construir e rodar o container:

1. Build do container:
```bash
docker build -t highload-delivery-simulation .
```

2. Run do container:
```bash
docker run -p 3000:3000 --env-file .env highload-delivery-simulation
```

> Certifique-se de que RabbitMQ, Redis e MongoDB estejam acessíveis pelo container, via network ou variáveis de ambiente.

---

### 3. Executando Testes

```bash
npm run test
```

- Os testes usam **Jest + Supertest**.  
- Para testes de carga e resultados, consulte [**TESTES.md**](TESTES.md).

---
## Referência

- Para instruções detalhadas do desafio, consulte [**INSTRUCOES.md**](INSTRUCOES.md).  
- Para visualizar os testes de carga realizados e seus resultados, consulte [**TESTES.md**](TESTES.md).


