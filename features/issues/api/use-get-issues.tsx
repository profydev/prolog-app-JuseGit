import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue, IssueLevel, IssueStatus } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(
  page?: number,
  level?: IssueLevel,
  status?: IssueStatus,
  project?: string
) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page, level, status, project];
}

export function useGetIssues(
  page: number,
  level?: IssueLevel,
  status?: IssueStatus,
  project?: string
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, level, status, project),
    ({ signal }) => getIssues(page, { signal }, level, status, project),
    { keepPreviousData: true }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, { signal })
      );
    }
  }, [query.data, page, queryClient]);
  return query;
}
