import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { assertUnique, projectSchema, validateRecords } from "../scripts/lib/data.js";

const category = {
  id: "frameworks-orchestration", group: "Foundations", name_en: "Frameworks",
  name_zh: "框架", description_en: "Frameworks for orchestrating multiple collaborating agents.",
  description_zh: "用于编排多个协作智能体的框架。", order: 2
};
const project = {
  id: "sample", name: "Sample", repository_url: "https://github.com/example/sample", organization: "example",
  primary_category: category.id, tags: ["python"], project_type: "framework",
  coordination_pattern: ["role-based"], description_en: "A valid description of a multi-agent project with cooperating specialized roles.",
  description_zh: "一个具有多个专业角色协作机制的有效多智能体项目介绍。",
  primary_language: "Python", license: "MIT", self_hosted: true, status: "active",
  region: "global", github: { archived: false }, added_at: "2026-07-20",
  last_reviewed_at: "2026-07-20", source: "test"
};

describe("data validation", () => {
  it("rejects duplicate project identifiers", () => expect(() => validateRecords([project, project], [category])).toThrow(/Duplicate project id/));
  it("rejects duplicate repository URLs", () => expect(() => validateRecords([project, { ...project, id: "other" }], [category])).toThrow(/Duplicate repository URL/));
  it("rejects unknown categories", () => expect(() => validateRecords([{ ...project, primary_category: "missing" }], [category])).toThrow(/Unknown category/));
  it("rejects a missing Chinese description", () => expect(() => projectSchema.parse({ ...project, description_zh: "" })).toThrow());
  it("rejects invalid repository URLs", () => expect(() => projectSchema.parse({ ...project, repository_url: "not-a-url" })).toThrow());
  it("rejects invalid status values", () => expect(() => projectSchema.parse({ ...project, status: "unknown" })).toThrow());
  it("sorts categories by stable order", () => {
    const first = { ...category, id: "first", order: 1 };
    expect(validateRecords([project], [category, first]).categories.map((item) => item.id)).toEqual(["first", category.id]);
  });
  it("detects candidate duplicates with normalized keys", () => expect(() => assertUnique([{ url: "A" }, { url: "a" }], (item) => item.url, "candidate")).toThrow(/Duplicate candidate/));
  it("keeps committed READMEs synchronized", () => expect(() => execFileSync("pnpm", ["render:check"], { stdio: "pipe" })).not.toThrow());
});
