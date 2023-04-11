import { Issue } from "@api/issues.types";
import React, { ReactNode, useCallback, useReducer } from "react";
import { IssueContext } from "./issue-context";

export enum IssueActionType {
  INIT_ISSUES = "INIT_ISSUES",
  FILTER_ISSUES_BY_STATUS = "status",
  FILTER_ISSUES_BY_LEVEL = "level",
  FILTER_ISSUES_BY_SEARCH = "search",
  CLEAR_FILTER_STATUS = "status_clear",
  CLEAR_FILTER_LEVEL = "level_clear",
  CLEAR_FILTER_SEARCH = "search_clear",
}

// An interface for our state
export interface IssueState {
  issues: Issue[];
  filtered: Issue[] | null;
  activeFilters: { [propKey: string]: string };
}

interface IssueAction {
  type: IssueActionType;
  payload: string | Issue[]; //The filter
}

type IssuesStateProps = {
  children: ReactNode;
};

const issueReducer = (state: IssueState, action: IssueAction): IssueState => {
  console.log(`dispatched: ${action.type}, payload: ${action.payload}`);

  switch (action.type) {
    case IssueActionType.INIT_ISSUES:
      return {
        ...state,
        issues: typeof action.payload === "string" ? [] : action.payload,
      };

    case IssueActionType.FILTER_ISSUES_BY_STATUS:
    case IssueActionType.FILTER_ISSUES_BY_LEVEL:
    case IssueActionType.FILTER_ISSUES_BY_SEARCH:
      return updateFilters(state, action);

    case IssueActionType.CLEAR_FILTER_STATUS:
    case IssueActionType.CLEAR_FILTER_LEVEL:
    case IssueActionType.CLEAR_FILTER_SEARCH:
      return clearFilters(state, action);

    default:
      return state;
  }
};

const updateFilters = (state: IssueState, action: IssueAction) => {
  const updatedFilters = {
    ...state.activeFilters,
    [action.type]: typeof action.payload === "string" ? action.payload : "",
  };

  return {
    ...state,
    activeFilters: updatedFilters,
    filtered: state.issues?.filter((issue) => {
      return Object.keys(updatedFilters).every((key) => {
        return updatedFilters[key] === issue[key as keyof Issue];
      });
    }),
  };
};

const clearFilters = (state: IssueState, action: IssueAction) => {
  const filter = action.type.substring(0, action.type.indexOf("_"));
  const { [filter]: removedProps, ...curFilters } = state.activeFilters;

  return {
    ...state,
    activeFilters: curFilters,
    filtered:
      JSON.stringify(curFilters) === "{}"
        ? null
        : state.issues?.filter((issue) => {
            return Object.keys(curFilters).every((key) => {
              return curFilters[key] === issue[key as keyof Issue];
            });
          }),
  };
};

export const IssuesState = ({ children }: IssuesStateProps) => {
  const initialState: IssueState = {
    issues: [],
    filtered: null,
    activeFilters: {},
  };

  const [state, dispatch] = useReducer(issueReducer, initialState);

  const initIssues = useCallback((issues: Issue[]) => {
    dispatch({
      type: IssueActionType.INIT_ISSUES,
      payload: issues,
    });
  }, []);

  // Filter issues by status
  const filterIssuesByStatus = useCallback((filter: string) => {
    dispatch({
      type: IssueActionType.FILTER_ISSUES_BY_STATUS,
      payload: filter,
    });
  }, []);

  // Filter issues by level
  const filterIssuesByLevel = useCallback((filter: string) => {
    dispatch({
      type: IssueActionType.FILTER_ISSUES_BY_LEVEL,
      payload: filter,
    });
  }, []);

  // Clear filter
  const clearFilterStatus = useCallback(() => {
    dispatch({
      type: IssueActionType.CLEAR_FILTER_STATUS,
      payload: "",
    });
  }, []);

  // Clear filter
  const clearFilterLevel = useCallback(() => {
    dispatch({
      type: IssueActionType.CLEAR_FILTER_LEVEL,
      payload: "",
    });
  }, []);

  return (
    <IssueContext.Provider
      value={{
        issues: state.issues,
        filtered: state.filtered,
        initIssues,
        filterIssuesByStatus,
        filterIssuesByLevel,
        clearFilterStatus,
        clearFilterLevel,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
