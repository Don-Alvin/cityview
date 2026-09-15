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

if (hits.length > 0) {
  console.error(`\nFound ${hits.length} TODO_ placeholder(s), build blocked:\n`);
  for (const hit of hits) {
    console.error(`  ${hit.file}: ${hit.token}`);
  }
  console.error("\nResolve every TODO_ before this can ship. See IMPLEMENTATION.md.\n");
  process.exit(1);
}

console.log("No TODO_ placeholders found.");
