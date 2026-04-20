export class WaitHelper {
  static async waitForCondition(
    condition: () => boolean | Promise<boolean>,
    timeout = 5_000,
    interval = 200,
  ): Promise<void> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await condition()) return;
      await new Promise((r) => setTimeout(r, interval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  static async poll<T>(
    fn: () => Promise<T>,
    predicate: (result: T) => boolean,
    timeout = 5_000,
    interval = 200,
  ): Promise<T> {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const result = await fn();
      if (predicate(result)) return result;
      await new Promise((r) => setTimeout(r, interval));
    }
    throw new Error(`Poll condition not met within ${timeout}ms`);
  }
}
