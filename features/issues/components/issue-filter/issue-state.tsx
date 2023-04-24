import { IssueLevel, IssueStatus } from "@api/issues.types";
import React, { ReactNode, useCallback, useReducer } from "react";
import { IssueContext } from "./issue-context";

export enum IssueActionType {
  FILTER_ISSUES_BY_STATUS = "status",
  FILTER_ISSUES_BY_LEVEL = "level",
  FILTER_ISSUES_BY_PROJECT = "project",
  CLEAR_FILTER_STATUS = "status_clear",
  CLEAR_FILTER_LEVEL = "level_clear",
  CLEAR_FILTER_PROJECT = "project_clear",
}

// An interface for our state
export interface IssueState {
  activeFilters: { [propKey: string]: string | undefined };
}

type IssueFilter = {
  level: IssueLevel;
  status: IssueStatus;
  project: string;
};

type FilterByStatus = {
  type: IssueActionType.FILTER_ISSUES_BY_STATUS;
  payload: string;
};

type FilterByLevel = {
  type: IssueActionType.FILTER_ISSUES_BY_LEVEL;
  payload: string;
};

type FilterByProject = {
  type: IssueActionType.FILTER_ISSUES_BY_PROJECT;
  payload: string;
};

type ClearFilterStatus = {
  type: IssueActionType.CLEAR_FILTER_STATUS;
};

type ClearFilterLevel = {
  type: IssueActionType.CLEAR_FILTER_LEVEL;
};

type ClearFilterProject = {
  type: IssueActionType.CLEAR_FILTER_PROJECT;
};

type IssuesAction =
  | FilterByStatus
  | FilterByLevel
  | FilterByProject
  | ClearFilterStatus
  | ClearFilterLevel
  | ClearFilterProject;

type IssuesStateProps = {
  children: ReactNode;
};

const issueReducer = (state: IssueState, action: IssuesAction): IssueState => {
  switch (action.type) {
    case IssueActionType.FILTER_ISSUES_BY_STATUS:
    case IssueActionType.FILTER_ISSUES_BY_LEVEL:
    case IssueActionType.FILTER_ISSUES_BY_PROJECT:
      return updateFilters(state, action.type, action.payload);

    case IssueActionType.CLEAR_FILTER_STATUS:
    case IssueActionType.CLEAR_FILTER_LEVEL:
    case IssueActionType.CLEAR_FILTER_PROJECT:
      return clearFilters(state, action);

    default:
      return state;
  }
};

const updateFilters = (
  state: IssueState,
  key: IssueActionType,
  filter: string
) => {
  return {
    ...state,
    activeFilters: {
      ...state.activeFilters,
      [key]: filter,
    },
  };
};

const clearFilters = (state: IssueState, action: IssuesAction) => {
  const filter = action.type.substring(0, action.type.indexOf("_"));

  return {
    ...state,
    activeFilters: { ...state.activeFilters, [filter]: undefined },
  };
};

export const IssuesState = ({ children }: IssuesStateProps) => {
  const initialState: IssueState = {
    activeFilters: {
      level: undefined,
      status: undefined,
      project: undefined,
    },
  };

  const [state, dispatch] = useReducer(issueReducer, initialState);

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

  // Filter issues by level
  const filterIssuesByProject = useCallback((filter: string) => {
    dispatch({
      type: IssueActionType.FILTER_ISSUES_BY_PROJECT,
      payload: filter,
    });
  }, []);

  // Clear status filter
  const clearFilterStatus = useCallback(() => {
    dispatch({
      type: IssueActionType.CLEAR_FILTER_STATUS,
    });
  }, []);

  // Clear level filter
  const clearFilterLevel = useCallback(() => {
    dispatch({
      type: IssueActionType.CLEAR_FILTER_LEVEL,
    });
  }, []);

  // Clear project filter
  const clearFilterProject = useCallback(() => {
    dispatch({
      type: IssueActionType.CLEAR_FILTER_PROJECT,
    });
  }, []);

  return (
    <IssueContext.Provider
      value={{
        activeFilters: state.activeFilters,
        filterIssuesByStatus,
        filterIssuesByLevel,
        filterIssuesByProject,
        clearFilterStatus,
        clearFilterLevel,
        clearFilterProject,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
