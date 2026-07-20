# Contributing

Thank you for improving this directory. The fastest route is the **Project submission** issue form.

A submission must point to the primary public repository, identify an open-source license, and explain how two or more independently responsible agents communicate, delegate, collaborate, compete, or aggregate results. A high star count or a name containing Agent, Team, Crew, or Swarm is not sufficient.

Do not submit ordinary single-agent tools, generic RAG, a workflow with only sequential steps, ordinary MCP servers, forks, mirrors, closed products, papers without code, or small tutorial demos.

For a data pull request:

1. Choose exactly one stable category from `data/categories.yaml`.
2. Add a unique kebab-case ID, no more than four tags, accurate metadata, and both English and simplified-Chinese descriptions.
3. Write neutral descriptions in your own words; do not copy another list.
4. Modify `data/projects.yaml`, not generated README regions or website data.
5. Add or update the dated report when the change is substantial.
6. Run:

```bash
pnpm install
pnpm validate
pnpm render
pnpm render:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:site
pnpm check:links
```

Pull requests should list additions, updates, exclusions, category or status changes, and verification results. Maintainers may request stronger evidence that multi-agent collaboration is central.
