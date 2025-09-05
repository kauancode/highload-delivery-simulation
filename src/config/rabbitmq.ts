import amqp from "amqplib";

let channel: amqp.Channel | null = null;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const connectRabbitMQ = async () => {
  while (!channel) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL ?? "amqp://localhost");
      channel = await connection.createChannel();
      console.log('✅ [RabbitMQ] Conectado com sucesso');
    } catch (err) {
      console.error('❌ [RabbitMQ] Erro ao conectar, tentando novamente em 5s...', err);
      await delay(5000);
    }
  }
};

export const getChannel = () => channel;
