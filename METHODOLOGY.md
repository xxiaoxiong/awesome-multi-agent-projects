# Methodology

## Discovery

Candidate discovery combines GitHub repository search, GitHub topics, official organization pages, university labs, paper-linked code, releases, and maintainer submissions. Search is deliberately broader than inclusion. The first snapshot used eighteen general and domain queries and retained 240 of 435 deduplicated search results as a local candidate record.

External lists are used only to find candidates. Their wording and categories are not copied.

## Verification

A final record is checked for a real primary repository, non-fork identity, meaningful source code, an identifiable license, a documented multi-agent mechanism, a suitable unique primary category, maintenance state, and defensible metadata. Candidate code and dependencies are never executed.

## Editorial treatment

English and Chinese descriptions are written independently from verified facts. They explain what agents do and, where concise, how they coordinate. Promotional claims are removed. Unknown optional metadata is omitted instead of guessed.

## Data and generation

`data/projects.yaml` is the sole editorial project source. Zod validation checks shape and cross-record constraints; JSON Schemas support external tooling. Scripts render both READMEs and export a static website dataset. CI rejects drift.

## Updating

Discovery and metadata sync run before the weekly Codex review. Codex receives only local candidate files and follows `AGENTS.md`; it may add 5–15 strong projects, or none. Every automated update is a pull request requiring maintainer review.
