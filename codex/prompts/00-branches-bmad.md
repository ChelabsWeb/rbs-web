# Prompt — Create BMAD Branches and Scaffolds

You are Codex. Prepare the repository for a BMAD-driven workflow.

## Tasks
1) Create the following branches from `main` if not exist:
- branding/tokens
- branding/components-foundation
- messaging/voice-tone
- architecture/app-shell
- architecture/content-model
- architecture/cms-wp
- architecture/data-import
- design/ui-shell
- design/movie-page
- design/search-filters
- design/seo-a11y-perf
- release/v1.0.0 (no changes yet)

2) Generate files:
- docs/branches-bmad.md (use content from this prompt)
- .github/pull_request_template.md (use content from this prompt)

3) Commit using Conventional Commits and open PRs to `main` for:
- branding/tokens
- messaging/voice-tone
- architecture/app-shell
- design/ui-shell

## Acceptance
- Branches exist remotely
- PRs open with PR template content
- Lint/typecheck pass in CI (create minimal placeholder files if needed)
