export async function retry<T>(
  fn: () => Promise<T>,
  options?: { name?: string; retries?: number; delay?: number }
): Promise<T> {
  let { retries, delay, name } = { retries: 3, delay: 1000, ...options };
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      console.log(`Attempt ${i + 1} failed: ${name ? name + ': ' : ''}${e}`);
    }
    await new Promise(resolve => setTimeout(resolve, delay * 2 ** i));
  }
  throw new Error('Exceeded number of retries');
}
