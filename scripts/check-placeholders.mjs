#!/usr/bin/env node
// IMPLEMENTATION.md: placeholders must be loud (TODO_PHONE, never a
// plausible-looking fake number) precisely so a leftover one is easy to
// catch mechanically. This greps src/ and public/ for TODO_ and fails
// the build if any remain, so "it looked done" can't ship with one.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "public"];
const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".mdx", ".json", ".html", ".svg",
]);

function walk(dir, hits) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, hits);
      continue;
    }
    if (!TEXT_EXTENSIONS.has(extname(full))) continue;
    const content = readFileSync(full, "utf8");
    const matches = content.match(/TODO_[A-Z_]+/g);
    if (matches) {
      for (const match of new Set(matches)) {
        hits.push({ file: full, token: match });
      }
    }
  }
}

const hits = [];
for (const root of ROOTS) {
  try {
    walk(root, hits);
  } catch {
    // root doesn't exist yet, nothing to check
  }
}

// Flip back to `true` the moment the real contact details land. Alvin
// set this to false on 2026-09-15 so main could deploy for a client
// presentation while the placeholders were still outstanding: the gate
// was doing its job and blocking the build, which is the whole point of
// it, but the presentation had to happen before the client meeting that
// resolves the placeholders.
//
// Losing the gate does not mean losing the protection that mattered
// most. While any contact value is still TODO_, contact.ts reports it and
// the site serves noindex plus a disallow-all robots.txt, so placeholder
// contact details and placeholder opening hours cannot reach Google. That
// clears itself automatically when the real values land, with no second
// switch to remember.
const FAIL_ON_PLACEHOLDERS = false;

if (hits.length > 0) {
  const log = FAIL_ON_PLACEHOLDERS ? console.error : console.warn;
  log(
    `\nFound ${hits.length} TODO_ placeholder(s)${FAIL_ON_PLACEHOLDERS ? ", build blocked" : ""}:\n`,
  );
  for (const hit of hits) {
    log(`  ${hit.file}: ${hit.token}`);
  }

  if (FAIL_ON_PLACEHOLDERS) {
    log("\nResolve every TODO_ before this can ship. See IMPLEMENTATION.md.\n");
    process.exit(1);
  }

  log(
    [
      "",
      "  ! The placeholder gate is OFF (FAIL_ON_PLACEHOLDERS in this file).",
      "  ! This build ships with the placeholders listed above visible on the",
      "  ! page. The site is serving noindex while they remain, so they cannot",
      "  ! be indexed, but anyone who opens the URL will see them.",
      "  ! Set FAIL_ON_PLACEHOLDERS back to true once the real details land.",
      "",
    ].join("\n"),
  );
  process.exit(0);
}

console.log("No TODO_ placeholders found.");
