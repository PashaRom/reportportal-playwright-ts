export class RetryHelper {
  static async retry<T>(fn: () => Promise<T>, retries = 3, backoffMs = 500): Promise<T> {
    let lastError: Error | undefined;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, backoffMs * attempt));
        }
      }
    }
    throw lastError;
  }
}
