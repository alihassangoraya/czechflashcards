export async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
      if ((index + 1) % 25 === 0 || index + 1 === items.length) console.log(`Translated ${index + 1}/${items.length}`);
    }
  }));
  return results;
}
