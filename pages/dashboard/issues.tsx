import { PageContainer } from "@features/layout";
import { IssueList } from "@features/issues";
import type { NextPage } from "next";
import { IssueFilter } from "@features/issues";
import { IssuesState } from "@features/issues";

const IssuesPage: NextPage = () => {
  return (
    <PageContainer
      title="Issues"
      info="Overview of errors, warnings, and events logged from your projects."
    >
      <IssuesState>
        <IssueFilter />
        <IssueList />
      </IssuesState>
    </PageContainer>
  );
};

export default IssuesPage;
