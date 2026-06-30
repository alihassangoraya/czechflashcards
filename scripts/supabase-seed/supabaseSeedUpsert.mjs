export async function upsertCardRows({ baseUrl, rows, serviceKey, offset }) {
  const response = await fetch(`${baseUrl}/cards?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates"
    },
    body: JSON.stringify(rows)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase seed upsert failed at ${offset}: ${response.status} ${body}`);
  }
}
