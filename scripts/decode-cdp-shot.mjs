import fs from "node:fs";
import path from "node:path";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("Usage: node decode-cdp-shot.mjs <cdp-json> <out.png>");
  process.exit(1);
}
const j = JSON.parse(fs.readFileSync(src, "utf8"));
const data = j.data ?? j.result?.data;
if (!data) {
  console.error("No screenshot data. Keys:", Object.keys(j));
  process.exit(1);
}
const buf = Buffer.from(data, "base64");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
console.log(JSON.stringify({ out, bytes: buf.length, w, h }));
