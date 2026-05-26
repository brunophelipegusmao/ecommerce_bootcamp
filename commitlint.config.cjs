module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 400],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "chore",
        "docs",
        "test",
        "style",
        "perf",
        "ci",
      ],
    ],
  },
};
