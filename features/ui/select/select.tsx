import { color, textFont } from "@styles/theme";
import React from "react";
import styled from "styled-components";
import {
  default as ReactSelect,
  GroupBase,
  SingleValue,
  StylesConfig,
} from "react-select";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly isEmpty?: boolean;
}

export type SelectIconProps = {
  color?: string;
  hasIcon?: boolean;
  content?: string;
  width?: string;
  height?: string;
};

type SelectProps = {
  label: string;
  name: string;
  disabled: boolean;
  options?: ReadonlyArray<SelectOption>;
  error?: boolean;
  errorMsg: string;
  isEmpty?: boolean;
  hint?: string;
  onChange?: (selected: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  width?: string;
  icon?: SelectIconProps;
};

const defaultIconProps = {
  color: "white",
  hasIcon: false,
  content: "",
  width: "0",
  height: "0",
};

const Container = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: ${(props) => props.width};
`;

const Label = styled.span`
  margin-bottom: 0.375em;
  color: ${color("gray", 700)};
  ${textFont("sm", "medium")};
`;

const Hint = styled.span<{ isError: boolean }>`
  margin-top: 0.375em;
  color: ${(props) =>
    props.isError ? color("error", 500) : color("gray", 500)};
  ${textFont("sm", "regular")};
`;

const dot = (props: SelectIconProps) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    display: "block",
    marginRight: "8px",
    width: props.width,
    height: props.height,
    content: '" "',
    backgroundColor: props.color,
    mask: props.hasIcon ? `url(${props.content}) no-repeat` : "none",
  },
});

const checkMark = (isSelected: boolean) => ({
  ":after": {
    display: isSelected ? "block" : "none",
    marginLeft: "auto",
    width: "1.25em",
    height: "1.25em",
    content: "url(/icons/check-option.svg)",
  },
});

const customStyles = (
  isEmpty: boolean,
  error: boolean,
  icon: SelectIconProps
): StylesConfig<SelectOption, false, GroupBase<SelectOption>> => {
  return {
    container: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: state.isDisabled ? "#F9FAFB" : "white",
      color: state.isDisabled ? "#D0D5DD" : "#101828",
      border: error
        ? "1px solid #FDA29B"
        : state.isFocused
        ? "1px solid #D6BBFB"
        : "1px solid #D0D5DD",
      boxShadow: state.isFocused
        ? error
          ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2"
          : "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF"
        : "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "8px",
      padding: "10px 14px",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      ...dot(icon),
      ...checkMark(state.isSelected),
      color: "#101828",
      background: state.isSelected ? "#FCFAFF" : "white",
      padding: "10px 14px",
      ":hover": {
        background: "#FCFAFF",
      },
      ":first-child": {
        color: isEmpty ? "#667085" : "#FCFAFF",
      },
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      padding: 0,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: 0,
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      ...dot(icon),
      margin: 0,
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      ...dot(icon),
      color: isEmpty || state.isDisabled ? "#667085" : "inherit",
      margin: 0,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      boxShadow:
        "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
      borderRadius: "8px",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      padding: 0,
    }),
  };
};

export const Select = (props: SelectProps) => {
  const {
    label = "",
    options,
    name,
    disabled = false,
    error = false,
    errorMsg = "",
    isEmpty = false,
    hint,
    onChange,
    onFocus,
    width = "1em",
    icon = defaultIconProps,
  } = props;

  const handleChange = (selected: SingleValue<SelectOption>) => {
    if (selected) {
      onChange && onChange(selected.value);
    }
  };

  return (
    <Container width={width}>
      <Label>{label}</Label>
      <ReactSelect
        name={name}
        classNamePrefix={"select"}
        options={options}
        isDisabled={disabled}
        isSearchable={false}
        placeholder={`${options && options[0].label}`}
        onChange={handleChange}
        onFocus={onFocus}
        styles={customStyles(isEmpty, error, icon)}
      />
      <Hint isError={error}>
        {!error && hint ? hint : error ? errorMsg : ""}
      </Hint>
    </Container>
  );
};
