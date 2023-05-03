import { createContext, useContext } from "react";

interface IssueContextTypes {
  activeFilters: { [propKey: string]: string | undefined };
  filterIssuesByStatus: (filter: string) => void;
  filterIssuesByLevel: (filter: string) => void;
  filterIssuesByProject: (filter: string, newURL: boolean) => void;
  clearFilterStatus: () => void;
  clearFilterLevel: () => void;
  clearFilterProject: () => void;
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
