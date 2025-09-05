/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Redis from 'ioredis'

const redis = new Redis({
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
})

const timestamp = () => new Date().toISOString();

redis.on('connect', ()=> {
 console.log(
    `✅ [Redis] Conectado com sucesso em ${redis.options.host}:${redis.options.port} - ${timestamp()}`
  );
})

redis.on("error", (err) => {
  console.error(`❌ [Redis] Erro de conexão: ${err.message} - ${timestamp}`);
});

export default redis;