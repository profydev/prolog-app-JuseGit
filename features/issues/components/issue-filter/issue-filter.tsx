import { Select, SelectOption } from "@features/ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useIssueContext } from "./issue-context";

export type FilterOptions = {
  status: string;
  level: string;
  search: string;
};

const statusOptions: readonly SelectOption[] = [
  {
    value: "default",
    label: "No status filter",
    isFixed: false,
    isDisabled: false,
  },
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];

const levelOptions: readonly SelectOption[] = [
  {
    value: "default",
    label: "No level filter",
    isFixed: false,
    isDisabled: false,
  },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
];

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

export const IssueFilter = () => {
  const [status, setStatus] = useState("default");
  const [level, setLevel] = useState("default");
  const context = useIssueContext();
  const { filterIssuesByStatus, filterIssuesByLevel, clearFilterStatus } =
    context;

  const handleStatusChange = (selected: string) => {
    //setStatus(selected);
    if (selected !== "default") {
      filterIssuesByStatus(selected);
    } else {
      console.log("clearing status");
      clearFilterStatus();
    }
  };

  const handleLevelChange = (selected: string) => {
    if (selected !== "default") {
      filterIssuesByLevel(selected);
    } else {
      clearFilterStatus();
    }
  };

  return (
    <Container>
      {" "}
      <Select
        name="issue-status-filter"
        label=""
        options={statusOptions}
        disabled={false}
        isEmpty={true}
        errorMsg=""
        width="260px"
        onChange={handleStatusChange}
      />
      <Select
        name="issue-level-filter"
        label=""
        options={levelOptions}
        disabled={false}
        isEmpty={true}
        errorMsg=""
        width="260px"
        onChange={handleLevelChange}
      />
    </Container>
  );
};
