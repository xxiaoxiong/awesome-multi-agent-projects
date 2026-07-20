import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { ROOT } from "./lib/data.js";
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required for metadata sync");
const file = path.join(ROOT, "data/projects.yaml");
const projects = YAML.parse(await readFile(file, "utf8"));
const headers = { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" };
async function fetchRepo(slug: string, attempt = 0): Promise<any> {
  const response = await fetch(`https://api.github.com/repos/${slug}`, { headers, signal: AbortSignal.timeout(15_000) });
  if ((response.status === 429 || response.status >= 500) && attempt < 2) {
    await new Promise((resolve) => setTimeout(resolve, 1_000 * (attempt + 1)));
    return fetchRepo(slug, attempt + 1);
  }
  if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
  return response.json();
}
let updated = 0;
for (const project of projects) {
  const slug = new URL(project.repository_url).pathname.slice(1).replace(/\/$/, "");
  try {
    const repo = await fetchRepo(slug);
    project.primary_language = repo.language ?? project.primary_language;
    project.github = { stars: repo.stargazers_count, forks: repo.forks_count, open_issues: repo.open_issues_count, last_push_at: repo.pushed_at, archived: repo.archived };
    if (repo.archived) project.status = "archived";
    updated += 1;
  } catch (error) { console.warn(`Temporary metadata failure retained existing record: ${String(error)}`); }
}
await writeFile(file, YAML.stringify(projects, { lineWidth: 120 }));
console.log(`Updated metadata for ${updated}/${projects.length} projects without changing descriptions or categories.`);
