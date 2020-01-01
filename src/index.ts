import { NowRequest, NowResponse } from "@now/node";

export const getName = (query: { name?: string }): string | null =>
  query.name || null;

export default (request: NowRequest, response: NowResponse): NowResponse =>
  response.send(`Hello ${getName(request.query)}.`);
