---
name: conventional-commits
description: >-
  Formats git commit messages per Conventional Commits 1.0.0. Use when writing
  or reviewing commit messages, staging changes for commit, running git commit,
  amending commits, or when the user asks for a commit message.
disable-model-invocation: true
---

# Conventional Commits

## Required format

```
<type>[optional scope]: <description>

```

- **type** (required): `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, or another short lowercase token the team agrees on.
- **scope** (optional): noun in parentheses describing the area, e.g. `(backend)`, `(frontend)` or `(shared)`.

## Before writing the message

1. Infer `type` from the diff (new capability → `feat`, bugfix → `fix`, etc.).
2. Pick `scope` from touched packages/apps (e.g. `frontend`, `backend`). The repo structure makes it obvious.
3. Keep one logical change per commit when the user is not explicitly bundling.

## Examples

```
feat(backend): add user session validation

fix(frontend): prevent double emission on transport submit

docs: align README with monorepo layout

chore(ci): pin Node version in workflow

chore(agents): add conventional commits skill and Cursor rule

```

## Do not

- Use a vague subject like "fix stuff", "updates", or "WIP" unless the user explicitly wants it.