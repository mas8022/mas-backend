import { Global, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Injectable()
export class RedisService implements OnModuleDestroy {
  private client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT || 6379,
  });

  onModuleDestroy() {
    this.client.quit();
  }

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string, ttl?: number) {
    return ttl
      ? this.client.set(key, value, 'EX', ttl)
      : this.client.set(key, value);
  }

  del(key: string) {
    return this.client.del(key);
  }
}
