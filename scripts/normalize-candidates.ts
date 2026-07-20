import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const file = process.argv[2];
if (!file) throw new Error("Usage: pnpm normalize:candidates <candidate.json>");
const absolute = path.resolve(file);
const input = JSON.parse(await readFile(absolute, "utf8"));
const rows = Array.isArray(input) ? input : input.candidates;
if (!Array.isArray(rows)) throw new Error("Candidate file must contain an array");
const seen = new Set<string>();
const candidates = rows.filter((row: any) => {
  const key = String(row.url ?? row.repository_url ?? row.full_name ?? "").toLowerCase().replace(/\.git$/, "").replace(/\/$/, "");
  if (!key || seen.has(key)) return false;
  seen.add(key);
  return true;
});
await writeFile(absolute, JSON.stringify({ ...input, count: candidates.length, candidates }, null, 2) + "\n");
console.log(`Normalized ${candidates.length} unique candidates.`);
