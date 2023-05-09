import { useRouter } from "next/router";
import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import { useContext, useEffect } from "react";
import { useIssueContext } from "../issue-filter/issue-context";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import { NavigationContext } from "@features/layout";

const Container = styled.div`
  background: white;
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  overflow: hidden;
  margin-top: ${space(6)};
`;

const Table = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile ? "repeat(12, 1fr)" : "9fr 1fr 1fr 1fr"};
  width: 100%;
  border-collapse: collapse;
`;

const HeaderCell = styled.span<{ isMobile: boolean }>`
  display: ${(props) => (props.isMobile ? "none" : "block")};
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
  border-bottom: 1px solid ${color("gray", 200)};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: {
        page: newPage,
      },
    });

  const { activeFilters, filterIssuesByProject } = useIssueContext();
  const projects = useGetProjects();
  const issuesPage = useGetIssues(
    page,
    activeFilters.level as IssueLevel,
    activeFilters.status as IssueStatus,
    activeFilters.project
  );
  const { isMobile } = useContext(NavigationContext);

  useEffect(() => {
    const handleRouteChange = () => {
      filterIssuesByProject(router.query.project as string, false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, filterIssuesByProject]);

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );

  const { items, meta } = issuesPage.data || {};

  return (
    <Container>
      <Table isMobile={isMobile}>
        <HeaderCell isMobile={isMobile}>Issue</HeaderCell>
        <HeaderCell isMobile={isMobile}>Level</HeaderCell>
        <HeaderCell isMobile={isMobile}>Events</HeaderCell>
        <HeaderCell isMobile={isMobile}>Users</HeaderCell>

        {(items || []).map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            projectLanguage={projectIdToLanguage[issue.projectId]}
          />
        ))}
      </Table>
      <PaginationContainer>
        <div>
          <PaginationButton
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </PaginationButton>
        </div>
        <PageInfo>
          Page <PageNumber>{meta?.currentPage}</PageNumber> of{" "}
          <PageNumber>{meta?.totalPages}</PageNumber>
        </PageInfo>
      </PaginationContainer>
    </Container>
  );
}
