export async function translateToUrdu(text) {
  const params = new URLSearchParams({ client: "gtx", sl: "en", tl: "ur", dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${response.status}) for ${text}`);
  const payload = await response.json();
  const translated = payload?.[0]?.map((part) => part?.[0] || "").join("").trim();
  if (!translated) throw new Error(`Translation returned no result for ${text}`);
  return translated;
}
