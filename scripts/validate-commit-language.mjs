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
const normalizedLines = rawMessage
  .split("\n")
  .map((line) => line.trim())
  .filter(
    (line) =>
      line &&
      !line.startsWith("#") &&
      !line.startsWith("Merge ") &&
      !line.startsWith("Revert "),
  );
const commitText = normalizedLines.join(" ").toLowerCase();

// Keep subject ASCII-only to avoid non-English accents and punctuation.
if (/[^\x20-\x7E]/.test(subject)) {
  console.error(
    "\nCommit blocked: use English in the subject (ASCII only, no accents).",
  );
  process.exit(1);
}

// Keep the whole commit text ASCII-only to prevent Portuguese accents in body.
if (/[^\x20-\x7E]/.test(commitText)) {
  console.error(
    "\nCommit blocked: use English only in the entire commit message (ASCII only, no accents).",
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

const words = commitText.match(/[a-z]+/g) ?? [];
const portugueseIndicators = new Set([
  // Frequent connectors and stopwords in Portuguese.
  "de",
  "da",
  "das",
  "dos",
  "para",
  "com",
  "sem",
  "que",
  "por",
  "entre",
  "sobre",
  // Common Portuguese verbs and software terms found in commits.
  "adicionar",
  "adiciona",
  "corrigir",
  "corrige",
  "melhorar",
  "melhora",
  "ajustar",
  "ajusta",
  "atualizar",
  "atualiza",
  "implementacao",
  "melhoria",
  "carrinho",
  "pagina",
  "paginas",
  "autenticacao",
  "botao",
  "arquivo",
  "arquivos",
  "usuario",
  "usuarios",
]);

const foundPortugueseWords = words.filter((word) =>
  portugueseIndicators.has(word),
);

if (foundPortugueseWords.length > 0) {
  const uniqueWords = [...new Set(foundPortugueseWords)].slice(0, 5).join(", ");
  console.error(
    "\nCommit blocked: detected Portuguese terms in the commit message.",
  );
  console.error(`Detected terms: ${uniqueWords}`);
  console.error(
    "Use English in both subject and body. Example: fix(cart): update cart total calculation",
  );
  process.exit(1);
}
