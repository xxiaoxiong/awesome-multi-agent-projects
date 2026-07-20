import { loadData } from "./lib/data.js";
const { projects, site } = await loadData();
if (process.argv.includes("--internal")) { console.log("Internal links are verified by the static build."); process.exit(0); }
const targets = [...new Set([site.repository, ...projects.map((project) => project.repository_url), ...projects.flatMap((project) => project.homepage_url ? [project.homepage_url] : [])])];
let failures = 0, cursor = 0;
async function worker() {
  while (cursor < targets.length) {
    const url = targets[cursor++];
    if (!url) continue;
    let ok = false;
    let permanent = false;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      try {
        const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12_000), headers: { "user-agent": "awesome-multi-agent-projects-link-checker" } });
        if (response.status === 429) { console.warn(`RATE_LIMITED ${url}`); ok = true; }
        else if (response.status >= 200 && response.status < 400) ok = true;
        else if (response.status >= 500) await new Promise((resolve) => setTimeout(resolve, 750));
        else {
          console.error(`BROKEN ${response.status} ${url}`);
          permanent = response.status >= 400 && response.status < 500;
          if (permanent) break;
        }
      } catch (error) { if (attempt === 1) console.warn(`TEMPORARY ${url}: ${String(error)}`); }
    }
    if (!ok && permanent) failures += 1;
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
if (failures) throw new Error(`${failures} links failed after retries; no records were deleted.`);
console.log(`Checked ${targets.length} external links.`);
