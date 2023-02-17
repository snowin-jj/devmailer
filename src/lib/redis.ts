import Redis from 'ioredis';

export const redis = new Redis({
  port: parseInt(process.env.REDIS_CLIENT_PORT),
  username: process.env.REDIS_CLIENT_USERNAME,
  password: process.env.REDIS_CLIENT_PASSWORD,
  host: process.env.REDIS_CLIENT_HOST,
});
