import { Input, Select, SelectOption } from "@features/ui";
import { ChangeEventHandler } from "react";
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
    label: "Status",
    isFixed: false,
    isDisabled: false,
  },
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];

const levelOptions: readonly SelectOption[] = [
  {
    value: "default",
    label: "Level",
    isFixed: false,
    isDisabled: false,
  },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
];

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2.625em;
  gap: 8px;
`;

const defaultIconProps = {
  color: "gray",
  hasMask: true,
  content: "/icons/search.svg",
  width: "1.25em",
  height: "1.25em",
};

export const IssueFilter = () => {
  const context = useIssueContext();
  const {
    activeFilters,
    filterIssuesByStatus,
    filterIssuesByLevel,
    filterIssuesByProject,
    clearFilterStatus,
    clearFilterLevel,
    clearFilterProject,
  } = context;

  const handleStatusChange = (selected: string) => {
    //setStatus(selected);
    if (selected !== "default") {
      filterIssuesByStatus(selected);
    } else {
      clearFilterStatus();
    }
  };

  const handleLevelChange = (selected: string) => {
    if (selected !== "default") {
      filterIssuesByLevel(selected);
    } else {
      clearFilterLevel();
    }
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value !== "") {
      filterIssuesByProject(event.target.value);
    } else {
      clearFilterProject();
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
        width="10em"
        onChange={handleStatusChange}
      />
      <Select
        name="issue-level-filter"
        label=""
        options={levelOptions}
        disabled={false}
        isEmpty={true}
        errorMsg=""
        width="10em"
        onChange={handleLevelChange}
      />
      <Input
        icon={defaultIconProps}
        name="issue-project-filter"
        label=""
        placeholder="Project Name"
        width="17.5em"
        disabled={false}
        error={false}
        errorMsg=""
        onChange={handleSearchChange}
        value={activeFilters.project ? activeFilters.project : ""}
      />
    </Container>
  );
};
