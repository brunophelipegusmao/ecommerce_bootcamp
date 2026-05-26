#!/usr/bin/env node

import { readFileSync } from "node:fs";

const messageFile = process.argv[2];

if (!messageFile) {
  process.exit(0);
}

const rawMessage = readFileSync(messageFile, "utf8");
const firstLine = rawMessage
  .split("\n")
  .map((line) => line.trim())
  .find((line) => line && !line.startsWith("#"));

if (!firstLine) {
  process.exit(0);
}

if (firstLine.startsWith("Merge ") || firstLine.startsWith("Revert ")) {
  process.exit(0);
}

const headerMatch = firstLine.match(/^[a-z]+(?:\([^\n)]+\))?!?:\s+(.+)$/i);
if (!headerMatch) {
  process.exit(0);
}

const subject = headerMatch[1].trim();

// Keep subject ASCII-only to avoid non-English accents and punctuation.
if (/[^\x20-\x7E]/.test(subject)) {
  console.error(
    "\nCommit blocked: use English in the subject (ASCII only, no accents).",
  );
  process.exit(1);
}

const normalizedSubject = subject.toLowerCase();
const firstWord = normalizedSubject.match(/[a-z]+/)?.[0] ?? "";

const allowedEnglishVerbs = new Set([
  "add",
  "adjust",
  "allow",
  "bump",
  "change",
  "clean",
  "convert",
  "correct",
  "create",
  "deprecate",
  "disable",
  "document",
  "drop",
  "enable",
  "enforce",
  "extract",
  "fix",
  "handle",
  "implement",
  "improve",
  "increase",
  "migrate",
  "move",
  "optimize",
  "prevent",
  "refactor",
  "remove",
  "rename",
  "replace",
  "restrict",
  "revert",
  "simplify",
  "support",
  "update",
  "upgrade",
  "use",
  "validate",
]);

if (!allowedEnglishVerbs.has(firstWord)) {
  console.error(
    "\nCommit blocked: subject must be in English and start with an imperative English verb.",
  );
  console.error(
    "Examples: feat(auth): add google sign-in | fix(cart): correct total price calculation",
  );
  process.exit(1);
}
