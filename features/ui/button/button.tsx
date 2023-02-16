import { color, space, textFont } from "@styles/theme";
import React from "react";
import styled, { css } from "styled-components";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "empty-gray",
  error = "error",
  darkGray = "dark-gray",
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: ButtonIcon;
}

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
}

const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
  icon: ButtonIcon;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border-radius: ${space(2)};
  gap: 8px;

  // remove default button styles
  margin: 0;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          height: 2.25rem;
          padding: 0.5rem 0.875rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonSize.md:
        return css`
          height: ${space(10)};
          padding: 0.625rem 1rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonSize.lg:
        return css`
          height: 2.75rem;
          padding: 0.875rem 1.125rem;
          ${textFont("md", "medium")}
        `;
      case ButtonSize.xl:
        return css`
          height: ${space(12)};
          padding: ${space(3, 5)};
          ${textFont("md", "medium")}
        `;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case ButtonColor.secondary:
        return css`
          background: ${color("primary", 50)};
          color: ${color("primary", 700)};
          border: 1px solid ${color("primary", 50)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          &:hover {
            border: 1px solid ${color("primary", 100)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("primary", 100)};
          }
          &:disabled {
            color: ${color("primary", 300)};
            background: ${color("primary", 25)};
            border: 1px solid ${color("primary", 25)};
          }
        `;
      case ButtonColor.gray:
        return css`
          color: ${color("gray", 700)};
          border: 1px solid ${color("gray", 300)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          &:hover {
            background: ${color("gray", 50)};
            color: ${color("gray", 800)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("gray", 100)};
          }
          &:disabled {
            color: ${color("gray", 300)};
            border: 1px solid ${color("gray", 200)};
          }
        `;
      case ButtonColor.empty:
        return css`
          color: ${color("primary", 700)};
          border: none;
          &:hover {
            background: ${color("primary", 50)};
          }
          &:disabled {
            color: ${color("gray", 300)};
          }
        `;
      case ButtonColor.emptyGray:
        return css`
          color: ${color("gray", 500)};
          border: none;
          &:hover {
            color: ${color("gray", 600)};
            background: ${color("gray", 50)};
          }
          &:disabled {
            color: ${color("gray", 300)};
          }
        `;
      case ButtonColor.error:
        return css`
          color: white;
          background: ${color("error", 600)};
          border: 1px solid ${color("error", 600)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          &:hover {
            background: ${color("error", 700)};
            border: 1px solid ${color("error", 700)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("error", 100)};
          }
          &:disabled {
            background: ${color("error", 200)};
            border: 1px solid ${color("error", 200)};
          }
        `;
      case ButtonColor.darkGray:
        return css`
          color: ${color("gray", 100)};
          background: ${color("gray", 900)};
          border: none;
          justify-content: flex-start;
          padding: 0;
          gap: 0;
          width: fit-content;
          &:disabled {
            background: ${color("gray", 300)};
          }
        `;
      default:
        return css`
          color: white;
          background: ${color("primary", 600)};
          border: 1px solid ${color("primary", 600)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
          &:hover {
            background: ${color("primary", 700)};
            border: 1px solid ${color("primary", 700)};
          }
          &:focus {
            box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px ${color("primary", 100)};
          }
          &:disabled {
            background: ${color("primary", 200)};
            border: 1px solid ${color("primary", 200)};
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.icon) {
      case ButtonIcon.leading:
        return css`
          img {
            order: 0;
          }
        `;
      case ButtonIcon.trailing:
        return css`
          img {
            order: 1;
          }
        `;
      default:
        return css``;
    }
  }}

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

export const Button = (props: ButtonProps) => {
  const {
    children,
    size = ButtonSize.md,
    color = ButtonColor.empty,
    icon = ButtonIcon.only,
    ...rest
  } = props;
  return (
    <Container size={size} color={color} icon={icon} {...rest}>
      {React.Children.map(children, (child) => {
        return icon === "only"
          ? typeof child !== "string"
            ? child
            : null
          : child;
      })}
    </Container>
  );
};
