import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadData, ROOT } from "./lib/data.js";
const data = await loadData();
const output = path.join(ROOT, "site/src/generated");
await mkdir(output, { recursive: true });
await writeFile(path.join(output, "data.json"), JSON.stringify(data, null, 2) + "\n");
console.log(`Exported ${data.projects.length} projects for the static site.`);
