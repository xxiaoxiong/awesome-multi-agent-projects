import { loadData } from "./lib/data.js";
const { projects, categories } = await loadData();
const covered = new Set(projects.map((project) => project.primary_category));
if (covered.size < 15) throw new Error(`Expected at least 15 covered categories, found ${covered.size}`);
if (projects.length < 80 || projects.length > 130) throw new Error(`Initial release must contain 80–130 projects, found ${projects.length}`);
console.log(`Validated ${projects.length} projects across ${covered.size}/${categories.length} categories.`);
