function normalizedCzech(value) {
  return String(value || "").normalize("NFC").trim().toLocaleLowerCase("cs-CZ");
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

module.exports = { normalizedCzech, slug };
