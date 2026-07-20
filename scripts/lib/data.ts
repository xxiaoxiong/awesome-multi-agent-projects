import { readFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { z } from "zod";

export const ROOT = path.resolve(import.meta.dirname, "../..");
const dateString = z.union([z.string(), z.date().transform((value) => value.toISOString().slice(0, 10))]);
const url = z.string().url();

export const categorySchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  group: z.enum(["Foundations", "Applications"]),
  name_en: z.string().min(2),
  name_zh: z.string().min(2),
  description_en: z.string().min(20),
  description_zh: z.string().min(10),
  order: z.number().int().positive()
});

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  repository_url: url.refine((value) => new URL(value).hostname === "github.com", "repository_url must use github.com"),
  homepage_url: url.optional().nullable(),
  organization: z.string().min(1),
  primary_category: z.string(),
  tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(4),
  project_type: z.enum(["framework", "application", "product", "platform", "infrastructure", "research", "benchmark"]),
  coordination_pattern: z.array(z.string()).min(1),
  description_en: z.string().min(30).max(420),
  description_zh: z.string().min(15).max(240),
  primary_language: z.string().optional().nullable(),
  license: z.string().optional().nullable(),
  self_hosted: z.boolean(),
  status: z.enum(["active", "experimental", "inactive", "archived"]),
  region: z.string().optional(),
  github: z.object({
    stars: z.number().int().nonnegative().optional(),
    forks: z.number().int().nonnegative().optional(),
    open_issues: z.number().int().nonnegative().optional(),
    last_push_at: z.string().datetime().optional(),
    archived: z.boolean()
  }),
  added_at: dateString,
  last_reviewed_at: dateString,
  source: z.string().min(1)
});

export const siteSchema = z.object({
  name: z.string(), subtitle_en: z.string(), subtitle_zh: z.string(),
  tagline_en: z.string(), tagline_zh: z.string(), url, repository: url, last_updated: dateString
});

export type Project = z.infer<typeof projectSchema>;
export type Category = z.infer<typeof categorySchema>;

export async function readYaml<T>(relativePath: string): Promise<T> {
  return YAML.parse(await readFile(path.join(ROOT, relativePath), "utf8")) as T;
}

export function assertUnique<T>(items: T[], key: (item: T) => string, label: string): void {
  const seen = new Set<string>();
  for (const item of items) {
    const value = key(item).toLowerCase();
    if (seen.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

export function validateRecords(rawProjects: unknown, rawCategories: unknown) {
  const projects = z.array(projectSchema).parse(rawProjects);
  const categories = z.array(categorySchema).parse(rawCategories);
  assertUnique(projects, (project) => project.id, "project id");
  assertUnique(projects, (project) => project.repository_url.replace(/\/$/, ""), "repository URL");
  assertUnique(categories, (category) => category.id, "category id");
  assertUnique(categories, (category) => String(category.order), "category order");
  const categoryIds = new Set(categories.map((category) => category.id));
  for (const project of projects) {
    if (!categoryIds.has(project.primary_category)) throw new Error(`Unknown category "${project.primary_category}" for ${project.id}`);
    if (project.status === "archived" && !project.github.archived) throw new Error(`Archived project ${project.id} must set github.archived=true`);
  }
  return { projects, categories: [...categories].sort((a, b) => a.order - b.order) };
}

export async function loadData() {
  const [rawProjects, rawCategories, site, featured] = await Promise.all([
    readYaml<unknown>("data/projects.yaml"), readYaml<unknown>("data/categories.yaml"),
    readYaml<unknown>("data/site.yaml"), readYaml<string[]>("data/featured.yaml")
  ]);
  const validated = validateRecords(rawProjects, rawCategories);
  const parsedSite = siteSchema.parse(site);
  const projectIds = new Set(validated.projects.map((project) => project.id));
  for (const id of featured) if (!projectIds.has(id)) throw new Error(`Unknown featured project: ${id}`);
  return { ...validated, site: parsedSite, featured };
}
