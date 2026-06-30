const fs = require("fs");
const path = require("path");
const { outFile } = require("./shared-seed/seedConfig");
const { buildPayload } = require("./shared-seed/seedPayload");

const payload = buildPayload();
if (process.argv.includes("--check")) {
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (current !== payload) {
    console.error("Shared seed data is out of date. Run `npm run seed:shared`.");
    process.exit(1);
  }
  console.log("Shared seed data is current.");
} else {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, payload);
  console.log(`Wrote ${outFile}`);
}
