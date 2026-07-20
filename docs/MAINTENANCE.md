# Maintenance

## Weekly automated path

The Sunday 02:17 UTC workflow installs locked dependencies, discovers candidates with `GITHUB_TOKEN`, synchronizes static GitHub metadata, runs `openai/codex-action@v1` with `prompts/weekly-update.md`, validates the result, renders README files, builds the site, checks links, and opens a dated pull request when meaningful changes exist. It never merges.

Required repository secret: `OPENAI_API_KEY`. GitHub supplies `GITHUB_TOKEN` to the workflow.

## Maintainer review

Confirm candidate evidence, unique primary category, license, neutral bilingual wording, status changes, link results, and generated-file consistency. Re-run `pnpm check`, `pnpm lint`, and `pnpm test`. Examine deletions carefully; history is normally preserved through status changes.

## Manual run

Open **Actions → Weekly multi-agent ecosystem update → Run workflow**. Review the created branch and pull request. If no candidate qualifies, a no-change run is expected.

## Metadata and links

Run `pnpm sync:metadata` only with a scoped `GITHUB_TOKEN`. Temporary API failures retain existing data. Link failures do not automatically remove projects; distinguish permanent repository loss from rate limits, bot blocking, and transient network errors.

## Release cadence

Use dated update reports for weekly changes and `CHANGELOG.md` for releases. A release is created only after CI, static build, and production verification succeed.
