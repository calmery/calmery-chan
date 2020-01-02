export const REPOSITORY_OWNER_ID = "calmery";

// Comments

export const ON_CREATE_ISSUE_COMMENT =
  "Thank you for your contribution ! We will try and get back to you as soon as possible. xD.";
export const ON_CREATE_PR_COMMENT = `Thank you for your contribution ! We will review it as soon as possible. xD.\n\n@${REPOSITORY_OWNER_ID} You know what ! There is a new pull request. Please check !`;

// Tokens

export const GITHUB_PERSONAL_ACCESS_TOKEN =
  process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
