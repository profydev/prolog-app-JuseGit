import { axios } from "./axios";
import type { Issue, IssueLevel, IssueStatus } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
  level?: IssueLevel,
  status?: IssueStatus,
  project?: string
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, level, status, project },
    signal: options?.signal,
  });
  return data;
}
