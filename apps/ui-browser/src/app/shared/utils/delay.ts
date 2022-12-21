export async function delay(ms: number): Promise<number> {
  return new Promise((res) => setTimeout(res, ms));
}
