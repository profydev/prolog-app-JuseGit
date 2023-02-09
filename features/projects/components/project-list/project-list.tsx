import React from "react";
import styled from "styled-components";
import { breakpoint, color, space, textFont, theme } from "@styles/theme";
import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import LoadingIcon from "./loading-icon";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;

const ErrorScreen = styled.div.attrs({
  "data-cy": "error-screen",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color("error", 25)};
  border: 1px solid ${color("error", 300)};
  border-radius: ${space(2)};
  padding: ${space(4)};
  position: relative;
  gap: ${space(3)};
`;

const ErrorContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  color: ${color("error", 700)};
  gap: ${space(3)};
  ${textFont("sm", "medium")};
`;

const Icon = styled.img`
  width: ${space(5)};
  height: ${space(5)};
`;

const TryAgainButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border: none;
  color: ${color("error", 700)};
  background: transparent;
  padding: 0;
  gap: ${space(3)};
  ${textFont("sm", "medium")};

  &:hover {
    background: ${color("error", 50)};
  }
`;

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <LoadingIcon
        name="loading-icon"
        bgColor={color("primary", 50)({ theme })}
        fgColor={color("primary", 700)({ theme })}
      />
    );
  }

  if (isError) {
    console.error(error);
    return (
      <ErrorScreen>
        <Icon src={"/icons/alert-circle.svg"} alt="error icon" />
        <ErrorContent>
          <div>There was a problem while loading the project data</div>
          <TryAgainButton onClick={() => refetch()}>
            <div>Try again</div>
            <Icon src={"/icons/arrow-right.svg"} alt="arrow right icon" />
          </TryAgainButton>
        </ErrorContent>
      </ErrorScreen>
    );
  }

  return (
    <List>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </List>
  );
}
