import retry from "@octokit/plugin-retry";
import throttling from "@octokit/plugin-throttling";
import Octokit from "@octokit/rest";
import {
  WebhookPayloadIssues,
  WebhookPayloadPullRequest
} from "@octokit/webhooks";
import {
  GITHUB_PERSONAL_ACCESS_TOKEN,
  ON_CREATE_ISSUE_COMMENT,
  ON_CREATE_PR_COMMENT,
  REPOSITORY_OWNER_ID
} from "./constants";

const octokit = new (Octokit.plugin([retry, throttling]))({
  auth: GITHUB_PERSONAL_ACCESS_TOKEN,
  timeZone: "Asia/Tokyo",
  retry: {
    doNotRetry: ["429"]
  },
  throttle: {
    onAbuseLimit: (_, options): void => {
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
    onRateLimit: (retryAfter, options): boolean | undefined => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        octokit.log.info(`Retrying after ${retryAfter} seconds`);
        return true;
      }
    }
  }
});

// Helper Functions

const addAssignees = (
  repository: string,
  issue: number,
  assignees: string[]
): Promise<Octokit.Response<Octokit.IssuesAddAssigneesResponse>> => {
  const [owner, repo] = repository.split("/");

  return octokit.issues.addAssignees({
    assignees,
    issue_number: issue, // eslint-disable-line @typescript-eslint/camelcase
    owner,
    repo
  });
};

const createComment = (
  repository: string,
  issue: number,
  body: string
): Promise<Octokit.Response<Octokit.IssuesCreateCommentResponse>> => {
  const [owner, repo] = repository.split("/");

  return octokit.issues.createComment({
    body,
    issue_number: issue, // eslint-disable-line @typescript-eslint/camelcase
    owner,
    repo
  });
};

const createReviewRequest = (
  repository: string,
  pull: number,
  reviewers: string[]
): Promise<Octokit.Response<Octokit.PullsCreateReviewRequestResponse>> => {
  const [owner, repo] = repository.split("/");

  return octokit.pulls.createReviewRequest({
    pull_number: pull, // eslint-disable-line @typescript-eslint/camelcase
    owner,
    repo,
    reviewers
  });
};

export const isIssue = (payload): payload is WebhookPayloadIssues =>
  payload.issue !== undefined;

export const isPullRequest = (payload): payload is WebhookPayloadPullRequest =>
  payload.pull_request !== undefined;

// Events

export const onCreateIssue = async (
  payload: WebhookPayloadIssues
): Promise<void> => {
  /* eslint-disable @typescript-eslint/camelcase */

  const {
    issue,
    repository: { full_name: repository }
  } = payload;
  const assignees = [issue.user.login];

  // Issue を作成したユーザと REPOSITORY_OWNER_ID で指定したユーザを比較して異なる場合は Assignee として設定する
  if (issue.user.login !== REPOSITORY_OWNER_ID) {
    assignees.push(REPOSITORY_OWNER_ID);
  }

  await addAssignees(repository, issue.number, assignees);
  await createComment(repository, issue.number, ON_CREATE_ISSUE_COMMENT);

  /* eslint-enable @typescript-eslint/camelcase */
};

export const onCreatePullRequest = async (
  payload: WebhookPayloadPullRequest
): Promise<void> => {
  /* eslint-disable @typescript-eslint/camelcase */

  const {
    pull_request: pullRequest,
    repository: { full_name: repository }
  } = payload;
  const assignees = [pullRequest.user.login];
  const reviewers = [];

  // Pull Request を作成したユーザと REPOSITORY_OWNER_ID で指定したユーザを比較して異なる場合は Assignee、Reviewer として設定する
  if (pullRequest.user.login !== REPOSITORY_OWNER_ID) {
    assignees.push(REPOSITORY_OWNER_ID);
    reviewers.push(REPOSITORY_OWNER_ID);
  }

  await addAssignees(repository, pullRequest.number, assignees);
  await createComment(repository, pullRequest.number, ON_CREATE_PR_COMMENT);
  await createReviewRequest(repository, pullRequest.number, reviewers);

  /* eslint-enable @typescript-eslint/camelcase */
};
