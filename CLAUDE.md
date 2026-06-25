# CLAUDE.md — jobsearch (public CV / portfolio)

## What this repo is
The **public** CV / portfolio site for Reuben Potgieter. Plain static
HTML/CSS/JS — no framework, no build step. Served via GitHub Pages, so treat
**everything committed here (including git history) as permanently world-readable.**

## The rule: public-only
This repo holds the public site and nothing else. **Never** commit:
- Application notes, trackers, or status
- Cover-letter drafts
- Recruiter / contact info
- Salary research or offer numbers
- Any PII beyond what is deliberately published on the public CV

All private job-search data lives in a **separate local-only repo**:
`~/personal/jobsearch-private`. Working notes go there, not here.

`.gitignore` also lists `private/`, `applications/`, `cover-letters/`, etc. as a
backstop — but the real boundary is the separate repo. Don't rely on the backstop.

## Structure
- `index.html` — the site (currently a stub)
- `README.md` — public-facing readme
- `.env.example` — placeholder only; real secrets go in an untracked `.env`
- `.gitignore` — secrets + private-data backstop

## Secret hygiene
A shared pre-commit secret guard (`~/personal/.githooks/pre-commit`, wired via
`~/.gitconfig-personal` → `core.hooksPath`) runs on every commit in any
`~/personal` repo, including this one. It blocks secret-like filenames and
content (API keys, tokens, private keys, etc.). Don't duplicate it here.
Override only with `git commit --no-verify`, and only for a confirmed false positive.

## Publish workflow (GitHub Pages)
No build step — the served files *are* the source files.
1. Create a **public** GitHub repo and add it as `origin` (Pages needs public on the free tier).
2. Push `main`.
3. Enable Pages: Settings → Pages → Deploy from branch → `main` / root.

URL depends on the repo name:
- `jobsearch` → `https://reubenp007.github.io/jobsearch`
- `reubenp007.github.io` (exact name) → `https://reubenp007.github.io` (cleaner). Easy to rename later.

Publishing is outward-facing: **stop and confirm before creating a remote or pushing.**

## Working agreements
- Small, reviewable commits.
- Stop and ask before anything destructive or outward-facing: force-push,
  history rewrite, deleting files, changing/adding remotes, pushing, enabling Pages.
- Don't be a yes-man — flag a better option with the tradeoff.
