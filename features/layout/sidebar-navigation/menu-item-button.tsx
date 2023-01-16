import React from "react";
import { Button } from "@features/ui";
import { ListItem, Anchor, Icon } from "./menu-item-link";
import styled from "styled-components";

type MenuItemProps = {
  className?: string;
  text: string;
  iconSrc: string;
  onClick: () => void;
  isCollapsed: boolean;
};

const CollapseIcon = styled(Icon)<{ isCollapsed: boolean }>`
  transform: rotate(${({ isCollapsed }) => (isCollapsed ? "180deg" : "0")});
`;

export function MenuItemButton({
  className,
  text,
  onClick,
  iconSrc,
  isCollapsed,
}: MenuItemProps) {
  return (
    <ListItem className={className}>
      <Anchor as={Button} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <CollapseIcon
          src={iconSrc}
          alt={`${text} icon`}
          isCollapsed={isCollapsed}
        />{" "}
        {!isCollapsed && text}
      </Anchor>
    </ListItem>
  );
}
