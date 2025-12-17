import { Logger } from '@/packages/core';

export class ConsoleLogger implements Logger {
  info(message: string): void {
    const date = new Date().toISOString();
    console.log(`${date} | INFO | ${message}`);
  }
  error(message: string): void {
    const date = new Date().toISOString();
    console.error(`${date} | ERROR | ${message}`);
  }
  warn(message: string): void {
    const date = new Date().toISOString();
    console.warn(`${date} | WARN | ${message}`);
  }
  debug(message: string): void {
    const date = new Date().toISOString();
    console.debug(`${date} | DEBUG | ${message}`);
  }
}
