export class RandomHelper {
  static email(prefix = 'test'): string {
    return `${prefix}+${Date.now()}@example.com`;
  }

  static string(length = 8): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}
