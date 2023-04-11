import { Issue } from "@api/issues.types";
import { createContext, useContext } from "react";

interface IssueContextTypes {
  issues: Issue[];
  filtered: Issue[] | null;
  initIssues: (issues: Issue[]) => void;
  filterIssuesByStatus: (filter: string) => void;
  filterIssuesByLevel: (filter: string) => void;
  clearFilterStatus: () => void;
  clearFilterLevel: () => void;
}

const IssueContext = createContext<IssueContextTypes | null>(null);

const useIssueContext = () => {
  const currentIssueContext = useContext(IssueContext);

  if (!currentIssueContext) {
    throw new Error(
      "useIssueContext has to be used within <IssueContext.Provider>"
    );
  }

  return currentIssueContext;
};

export { IssueContext, useIssueContext };
