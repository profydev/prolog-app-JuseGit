import styled from "styled-components";
import capitalize from "lodash/capitalize";
import { color, space, textFont } from "@styles/theme";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import { useContext } from "react";
import { NavigationContext } from "@features/layout";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

const Row = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isMobile ? "repeat(12, 1fr)" : "9fr 1fr 1fr 1fr"};
  grid-column: span 12;

  &:nth-child(2n + 1) {
    background: ${color("gray", 50)};
  }
`;

const Cell = styled.span<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isMobile ? "center" : "start")};
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  grid-column: ${(props) => (props.isMobile ? "span 4" : "span 1")};
  gap: ${space(2)};

  padding: ${space(4, 6)};
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}
`;

const IssueCell = styled(Cell)`
  display: flex;
  align-items: center;
  flex-direction: row;

  grid-column: ${(props) => (props.isMobile ? "span 12" : "1 / span 1")};
`;

const LanguageIcon = styled.img`
  width: ${space(10)};
  margin-right: ${space(3)};
`;

const ErrorTypeAndMessage = styled.div`
  color: ${color("gray", 900)};
`;

const ErrorType = styled.span`
  ${textFont("sm", "medium")}
`;

const StatusTag = styled.span<{ isMobile: boolean }>`
  display: ${(props) => (props.isMobile ? "block" : "none")};
  ${textFont("sm", "medium")}
`;

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  const { isMobile } = useContext(NavigationContext);

  return (
    <Row isMobile={isMobile}>
      <IssueCell isMobile={isMobile}>
        <LanguageIcon
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <ErrorTypeAndMessage>
            <ErrorType>{name}:&nbsp;</ErrorType>
            {message}
          </ErrorTypeAndMessage>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </IssueCell>
      <Cell isMobile={isMobile}>
        <StatusTag isMobile={isMobile}>Status</StatusTag>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </Cell>
      <Cell isMobile={isMobile}>
        <StatusTag isMobile={isMobile}>Events</StatusTag>
        {numEvents}
      </Cell>
      <Cell isMobile={isMobile}>
        <StatusTag isMobile={isMobile}>Users</StatusTag>
        {numUsers}
      </Cell>
    </Row>
  );
}
