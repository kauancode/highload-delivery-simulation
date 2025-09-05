/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Redis from 'ioredis'

export const DEFAULT_CACHE_TTL = 300;

const redis = new Redis({
    host: process.env.REDIS_HOST ?? "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
})

redis.on('connect', ()=> {
 console.log(
    `✅ [Redis] Conectado com sucesso em ${redis.options.host}:${redis.options.port}}`
  );
})

redis.on("error", (err) => {
  console.error(`❌ [Redis] Erro de conexão: ${err.message}`);
});

export default redis;