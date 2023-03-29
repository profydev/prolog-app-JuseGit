import React, { FC, InputHTMLAttributes, useCallback, useState } from "react";
import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";

export type InputIconProps = {
  content: string;
  width: string;
  height: string;
  color?: string;
  hasMask?: boolean;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  width: string;
  disabled: boolean;
  error: boolean;
  errorMsg: string;
  hint?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  icon: InputIconProps;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CustomInput = styled.input<{
  disabled: boolean;
  isEmpty: boolean;
  error: boolean;
}>`
  color: ${(props) =>
    props.isEmpty || props.disabled ? color("gray", 500) : color("gray", 900)};
  background: ${(props) => (props.disabled ? color("gray", 50) : "white")};
  border: 1px solid
    ${(props) => (props.error ? color("error", 300) : color("gray", 300))};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: ${space(2)};
  outline: none;
  padding: 0.625rem 0.875rem;
  width: 100%;

  ${textFont("md", "regular")};

  &:focus {
    border: 1px solid
      ${(props) => (props.error ? color("error", 300) : color("primary", 300))};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
      0px 0px 0px 4px
        ${(props) =>
          props.error ? color("error", 100) : color("primary", 100)};
  }
`;

const InputWrapper = styled.div<{
  preIcon: InputIconProps;
  error: boolean;
  width: string;
}>`
  display: flex;
  position: relative;
  width: ${(props) => props.width};

  ${CustomInput} {
    padding-left: ${(props) => (props.preIcon ? "2.625rem" : "0.875rem")};
  }

  &:before {
    display: ${(props) => (props.preIcon ? "block" : "none")};
    position: absolute;
    align-self: center;
    content: ${(props) =>
      props.preIcon.hasMask ? '" "' : props.preIcon.content};
    mask: ${(props) =>
      props.preIcon.hasMask
        ? `url(${props.preIcon.content}) no-repeat`
        : "none"};
    background-color: ${(props) =>
      props.preIcon.color ? props.preIcon.color : "white"};
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.875rem;
  }

  &:after {
    display: ${(props) => (props.error ? "block" : "none")};
    position: absolute;
    align-self: center;
    content: url(/icons/alert-circle.svg);
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.875rem;
    right: 0;
  }
`;

const Label = styled.label`
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

const checkValue = (value?: string | number | readonly string[]) => {
  if (value !== undefined) {
    if (typeof value === "string") {
      return value.length > 0;
    } else if (typeof value === "number") {
      return value + "".length > 0;
    } else {
      return value[0].length > 0;
    }
  }

  return false;
};

export const Input: FC<InputProps> = (props) => {
  const {
    label = "",
    name,
    width,
    disabled = false,
    error = false,
    errorMsg = "",
    hint,
    onChange,
    onFocus,
    icon,
    ...rest
  } = props;
  const [isEmpty, setEmpty] = useState(!checkValue(props.value));

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setEmpty(!checkValue(event.target.value));
      onChange && onChange(event);
    },
    [onChange]
  );

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputWrapper preIcon={icon} error={error} width={width}>
        <CustomInput
          name={name}
          disabled={disabled}
          error={error}
          isEmpty={isEmpty}
          onChange={handleChange}
          onFocus={onFocus}
          {...rest}
        />
      </InputWrapper>
      <Hint isError={error}>
        {!error && hint ? hint : error ? errorMsg : ""}
      </Hint>
    </Container>
  );
};
