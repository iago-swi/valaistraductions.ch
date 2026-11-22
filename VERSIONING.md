# Versions and release notes

This repository holds one product: the website of Valais Traductions. It has one version
number, one changelog ([CHANGELOG.md](CHANGELOG.md), newest first) and one release per version.

Published releases: <https://github.com/iago-swi/valaistraductions.ch/releases>

## The number

`MAJOR.MINOR.PATCH`:

- `PATCH`: a fix or an adjustment, nothing new: a corrected text, a repaired link, a
  swapped image, visual polish.
- `MINOR`: something new that a visitor will notice: a page, a section, a language, a feature.
- `MAJOR`: a redesign, or a change that makes existing addresses stop working.

Several changes published together are one version, numbered by the largest of them.

Every change a visitor can notice gets a version: the pages, styles, scripts, images,
`contact.php`, `.htaccess`. Changes to documentation only (`README.md`, this file, `docs/`,
the `scrollcraft/` workspace, `.gitignore`) get no version, no tag and no release.

The tag is `vX.Y.Z`. A pushed tag is never moved or deleted. A mistake is corrected with a
new version.

## Publishing a version

Every change reaches `main` through a branch and a pull request. Nothing is committed or
pushed directly on `main`. `main` is never force-pushed, and existing history is not rewritten.

When the owner says **"publish"**, do all the steps below. When the owner says **"open a
pull request"**, stop after step 4 and give the link.

1. Bring `main` up to date and create a branch from it: `release/site-vX.Y.Z` for a
   version, `docs/<short-name>` for a change to the documentation only.

   ```bash
   git switch main
   git pull --ff-only
   git switch -c release/site-v1.1.0
   ```

2. For a version, add a section at the top of `CHANGELOG.md`, with the date and the headings
   that apply: `Added`, `Changed`, `Fixed`, `Removed`. Write it for visitors and for the
   owner, in plain language.

3. Commit on the branch, the changelog together with the change, under the owner's Git
   identity. The message is plain and carries no attribution lines (no `Co-Authored-By`,
   no `Generated with`).

4. Push the branch and open a pull request with `gh pr create`. Title: the version number
   and a few words. Body: the changelog section for this version.

5. Merge it with a merge commit, not a squash and not a rebase:

   ```bash
   gh pr merge --merge --delete-branch
   ```

6. For a version, tag the merge commit on `main` (annotated, `vX.Y.Z`), push the tag, and
   create the GitHub release with the changelog section as its notes.

Publishing a version does not put it online. The site goes live when the files are copied
to the host (see the README).
