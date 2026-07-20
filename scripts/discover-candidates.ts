import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { ROOT } from "./lib/data.js";
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required for candidate discovery");
const source = YAML.parse(await readFile(path.join(ROOT, "data/sources.yaml"), "utf8"));
const known = YAML.parse(await readFile(path.join(ROOT, "data/projects.yaml"), "utf8"));
const knownUrls = new Set(known.map((project: any) => project.repository_url.toLowerCase().replace(/\/$/, "")));
const discovered = new Map<string, any>();
const headers = { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" };
async function github(pathname: string) {
  const response = await fetch(`https://api.github.com${pathname}`, { headers, signal: AbortSignal.timeout(20_000) });
  if (response.status === 403 || response.status === 429) throw new Error(`GitHub rate limit: ${response.status}`);
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}
for (const query of source.queries.slice(0, 20)) {
  const result = await github(`/search/repositories?q=${encodeURIComponent(query + " fork:false")}&sort=updated&order=desc&per_page=30`);
  for (const repo of result.items) {
    const url = String(repo.html_url).toLowerCase().replace(/\/$/, "");
    if (repo.fork || knownUrls.has(url)) continue;
    const key = repo.full_name.toLowerCase();
    const existing = discovered.get(key);
    discovered.set(key, {
      full_name: repo.full_name, url: repo.html_url, description: repo.description, topics: repo.topics ?? [],
      stars: repo.stargazers_count, forks: repo.forks_count, license: repo.license?.spdx_id ?? null,
      language: repo.language, created_at: repo.created_at, updated_at: repo.updated_at, archived: repo.archived,
      discovery_queries: [...new Set([...(existing?.discovery_queries ?? []), query])],
      relevance: (existing?.relevance ?? 0) + 1 + Math.log10(repo.stargazers_count + 1)
    });
  }
}
const candidates = [...discovered.values()].sort((a, b) => b.relevance - a.relevance).slice(0, 300);
const date = new Date().toISOString().slice(0, 10);
const directory = path.join(ROOT, "data/candidates");
await mkdir(directory, { recursive: true });
await writeFile(path.join(directory, `${date}.json`), JSON.stringify({ generated_at: new Date().toISOString(), count: candidates.length, candidates }, null, 2) + "\n");
console.log(`Discovered ${candidates.length} candidates. Candidate text is untrusted input and has not been executed.`);
