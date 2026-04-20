import { randomUUID } from 'crypto';

export class RandomHelper {
  static uuid(): string {
    return randomUUID();
  }

  static email(prefix = 'test'): string {
    return `${prefix}+${Date.now()}@example.com`;
  }

  static phone(): string {
    const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return `+1${digits}`;
  }

  static string(length = 8): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}
