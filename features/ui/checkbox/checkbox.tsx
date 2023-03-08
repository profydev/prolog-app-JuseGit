import { color, space, textFont } from "@styles/theme";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { makeCombineRefs } from "../../../utils/combineRefs";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

type CheckboxProps = {
  children: React.ReactNode;
  customSize?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void; // Can consider to add event parameter
};

const Input = styled.input.attrs({ type: "checkbox" })<{
  customSize: CheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
}>`
  appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 0.5em;
  outline: none;
  cursor: pointer;

  ${(props) => {
    switch (props.customSize) {
      case CheckboxSize.sm:
        return css`
          width: ${space(4)};
          height: ${space(4)};
          border-radius: ${space(1)};
        `;
      case CheckboxSize.md:
        return css`
          width: ${space(5)};
          height: ${space(5)};
          border-radius: 0.375em;
        `;
    }
  }}

  &:before {
    box-sizing: border-box;
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    background: white;
    border: 1px solid ${color("gray", 300)};
  }

  &:after {
    display: flex;
    box-sizing: border-box;
    position: absolute;
    transition: transform 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  &:hover {
    &:before {
      background: ${color("primary", 50)};
      border: 1px solid ${color("primary", 600)};
    }
  }

  &:focus {
    box-shadow: 0px 0px 0px 4px ${color("primary", 100)};
    &:before {
      border: 1px solid ${color("primary", 300)};
    }
  }

  ${(props) => {
    if (props.checked) {
      return css`
        &:before {
          background: ${color("primary", 50)};
          border: 1px solid ${color("primary", 600)};
        }

        &:after {
          content: ${props.disabled
            ? 'url("/icons/check-mark-gray.svg")'
            : 'url("/icons/check-mark.svg")'};
          width: ${props.customSize === CheckboxSize.sm ? "0.75em" : "0.875em"};
          height: ${props.customSize === CheckboxSize.sm
            ? "0.75em"
            : "0.875em"};
        }

        &:focus {
          &:before {
            border: 1px solid ${color("primary", 600)};
          }
        }
      `;
    }
  }}

  ${(props) => {
    if (props.indeterminate) {
      return css`
        &:before {
          background: ${color("primary", 50)};
          border: 1px solid ${color("primary", 600)};
        }

        &:after {
          content: ${props.disabled
            ? 'url("/icons/indeterminate-gray.svg")'
            : 'url("/icons/indeterminate.svg")'};
          width: ${props.customSize === CheckboxSize.sm ? "0.75em" : "0.875em"};
          height: ${props.customSize === CheckboxSize.sm
            ? "0.75em"
            : "0.875em"};
        }

        &:focus {
          &:before {
            border: 1px solid ${color("primary", 600)};
          }
        }
      `;
    }
  }}

  ${(props) => {
    if (props.disabled) {
      return css`
        &:before {
          background: ${color("gray", 100)};
          border: 1px solid ${color("gray", 200)};
          pointer-events: none;
        }

        &:hover {
          &:before {
            background: ${color("gray", 100)};
            border: 1px solid ${color("gray", 200)};
          }
        }
      `;
    }
  }}
`;

const Label = styled.label<{
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  position: relative;
  ${textFont("md", "medium")};
  ${(props) => {
    if (props.disabled) {
      return css`
        color: ${color("gray", 300)};
      `;
    } else {
      return css`
        color: ${color("gray", 700)};
      `;
    }
  }}
`;

export const Checkbox = (props: CheckboxProps) => {
  const {
    children,
    indeterminate = false,
    customSize = CheckboxSize.md,
    checked = false,
    disabled = false,
    onChange,
  } = props;
  // Add more refs if needed. Might implement forwardRef and focus control
  const combineRefs = makeCombineRefs<HTMLInputElement>((element) => {
    element && (element.indeterminate = !!indeterminate);
  });

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (onChange) {
        onChange(event, event.target.checked);
      }
    },
    [onChange]
  );

  return (
    <Label disabled={disabled}>
      <Input
        ref={combineRefs}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        customSize={customSize}
        onChange={handleChange}
      />
      {children}
    </Label>
  );
};
