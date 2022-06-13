import Redis from 'ioredis';
import { promisify } from 'util';

export const redis = new Redis();

redis.on('connect', () => {
  console.log('Redis connected');
})
  .on('error', (err) => {
    console.log('Redis error', err);
  })

export const getRedis = (value: string) => {
  return promisify(redis.get).bind(redis)(value);
}

export const setRedis = (key: string, value: string) => {
  return promisify(redis.set).bind(redis)(key, value);
}