import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadData, ROOT, type Category, type Project } from "./lib/data.js";

const { projects, categories, site } = await loadData();
const isCheck = process.argv.includes("--check");
const deploymentPending = site.url.endsWith(".invalid");

function projectLine(project: Project, language: "en" | "zh"): string {
  const description = language === "en" ? project.description_en : project.description_zh;
  const metadata = [project.project_type, project.primary_language, project.self_hosted ? "Self-hosted" : null, project.status !== "active" ? project.status : null]
    .filter(Boolean)
    .map((value) => `\`${value}\``)
    .join(" ");
  const home = project.homepage_url ? ` · [Website](${project.homepage_url})` : "";
  return `- [${project.name}](${project.repository_url}) — ${description}\n  ${metadata}${home}`;
}

function section(category: Category, language: "en" | "zh"): string {
  const list = projects.filter((project) => project.primary_category === category.id);
  if (!list.length) return "";
  const title = language === "en" ? category.name_en : category.name_zh;
  return `### ${title}\n\n${list.map((project) => projectLine(project, language)).join("\n\n")}`;
}

function render(language: "en" | "zh"): string {
  const zh = language === "zh";
  const latest = [...projects].sort((a, b) => String(b.added_at).localeCompare(String(a.added_at))).slice(0, 8);
  const domainLinks = categories
    .filter((category) => projects.some((project) => project.primary_category === category.id))
    .map((category) => deploymentPending
      ? `**${zh ? category.name_zh : category.name_en}**`
      : `[${zh ? category.name_zh : category.name_en}](${site.url}/${zh ? "zh/" : ""}categories/${category.id})`)
    .join(" · ");
  const foundations = categories.filter((category) => category.group === "Foundations").map((category) => section(category, language)).filter(Boolean).join("\n\n");
  const applications = categories.filter((category) => category.group === "Applications").map((category) => section(category, language)).filter(Boolean).join("\n\n");
  const intro = zh
    ? "这是一个按实际应用领域组织、以质量和清晰边界为优先的开源多智能体项目目录。结构化数据同时生成中英文 README 与静态网站，避免多份清单漂移。"
    : "A quality-first directory of open-source multi-agent systems organized by what they actually build. One structured dataset generates both READMEs and the static website, preventing duplicated lists from drifting.";
  const websiteLinks = deploymentPending
    ? `[${zh ? "网站部署待授权" : "Website deployment pending"}](docs/DEPLOYMENT.md) · [${zh ? "提交项目" : "Submit a Project"}](${site.repository}/issues/new?template=project-submission.yml)`
    : `[${zh ? "浏览网站" : "Explore Website"}](${site.url}) · [${zh ? "浏览项目" : "Browse Projects"}](${site.url}/${zh ? "zh/" : ""}projects) · [${zh ? "提交项目" : "Submit a Project"}](${site.repository}/issues/new?template=project-submission.yml)`;

  return `<p align="center"><img src="assets/banner.svg" alt="Awesome Multi-Agent Projects" width="100%" /></p>

# Awesome Multi-Agent Projects

> ${zh ? site.subtitle_zh : site.subtitle_en}

**${zh ? site.tagline_zh : site.tagline_en}**

[English](README.md) | [简体中文](README.zh-CN.md)

${websiteLinks}

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) ![Project Count](https://img.shields.io/badge/projects-${projects.length}-4f46e5) ![Categories](https://img.shields.io/badge/categories-${categories.length}-7c3aed) [![CI](${site.repository}/actions/workflows/ci.yml/badge.svg)](${site.repository}/actions/workflows/ci.yml) [![License](https://img.shields.io/badge/license-CC0--1.0-0f766e.svg)](LICENSE) ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

${intro}

## ${zh ? "最近收录" : "Latest Additions"}

${latest.map((project) => projectLine(project, language)).join("\n\n")}

## ${zh ? "按领域探索" : "Explore by Domain"}

${domainLinks}

<!-- AUTO-GENERATED:PROJECTS:START -->

## ${zh ? "应用领域" : "Applications"}

${applications}

## ${zh ? "基础能力" : "Foundations"}

${foundations}

<!-- AUTO-GENERATED:PROJECTS:END -->

## ${zh ? "收录标准" : "Inclusion Criteria"}

${zh ? "项目必须以两个或更多具有独立职责的智能体协作为核心能力，具有公开核心代码和可识别许可证。普通单智能体工具、普通 RAG、工作流示例、Fork 和营销仓库不会进入主清单。详见 [SCOPE.md](SCOPE.md) 与 [METHODOLOGY.md](METHODOLOGY.md)。" : "Projects must make collaboration between two or more independently responsible agents a core capability, expose their core source code, and have an identifiable license. Single-agent tools, ordinary RAG pipelines, workflow demos, forks, and marketing repositories are excluded. See [SCOPE.md](SCOPE.md) and [METHODOLOGY.md](METHODOLOGY.md)."}

## ${zh ? "参与贡献" : "Contributing"}

${zh ? "请通过 Project Submission Issue 提交候选项目，或按照 [CONTRIBUTING.md](CONTRIBUTING.md) 修改结构化数据。不要直接编辑自动生成区域。" : "Submit candidates through the Project Submission issue form or follow [CONTRIBUTING.md](CONTRIBUTING.md) to update structured data. Do not edit generated regions directly."}

## ${zh ? "致谢" : "Acknowledgements"}

${zh ? "感谢开源维护者、研究团队和贡献者持续推动多智能体系统发展。外部 Awesome List 仅用于发现候选，所有介绍均在本项目中独立撰写。" : "Thanks to the maintainers, research teams, and contributors advancing open multi-agent systems. External awesome lists are used only for discovery; descriptions here are independently written."}

## ${zh ? "许可证" : "License"}

[CC0 1.0 Universal](LICENSE). Repository names and trademarks remain the property of their respective owners.
`;
}

for (const [file, language] of [["README.md", "en"], ["README.zh-CN.md", "zh"]] as const) {
  const target = path.join(ROOT, file);
  const next = render(language);
  if (isCheck) {
    const current = await readFile(target, "utf8").catch(() => "");
    if (current !== next) throw new Error(`${file} is out of date. Run pnpm render.`);
  } else {
    await writeFile(target, next);
    console.log(`Rendered ${file}`);
  }
}
