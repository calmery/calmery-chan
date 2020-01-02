import * as crypto from "crypto";
import { NowRequest, NowResponse } from "@now/node";
import { GITHUB_WEBHOOK_SECRET } from "./constants";
import {
  onCreatePullRequest,
  onCreateIssue,
  isIssue,
  isPullRequest
} from "./helpers";

const checkSecretToken = (request: NowRequest): boolean => {
  if (!GITHUB_WEBHOOK_SECRET) {
    throw new Error("GITHUB_WEBHOOK_SECRET is not defined");
  }

  const checksum = request.headers["x-hub-signature"];
  const digest = `sha1=${crypto
    .createHmac("sha1", GITHUB_WEBHOOK_SECRET)
    .update(JSON.stringify(request.body))
    .digest("hex")}`;

  return checksum === digest;
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (!checkSecretToken(request)) {
    response.status(401).end();
    return;
  }

  const { body } = request;

  if (body.action === "opened") {
    if (isIssue(body)) {
      await onCreateIssue(body);
    }

    if (isPullRequest(body)) {
      await onCreatePullRequest(body);
    }
  }

  response.status(200).end();
};
