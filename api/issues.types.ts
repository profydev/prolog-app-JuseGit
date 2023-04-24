export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  open = "unresolved",
  resolved = "resolved",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  status: IssueStatus;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
};
