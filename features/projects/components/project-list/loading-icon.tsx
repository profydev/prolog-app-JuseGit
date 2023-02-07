import React from "react";
import styled, { keyframes } from "styled-components";

type LoadingIconProps = {
  name: string;
  bgColor: string;
  fgColor: string;
};

const Icon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
})``;

const svgAnimation = keyframes`
  0% {
    transform: rotateZ(360deg);
  }
  100% {
    transform: rotateZ(0deg)
  }
`;

const fillAnimation = keyframes`
  0%,
  25% {
    stroke-dashoffset: -216;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: -75;
    transform: rotate(-45deg);
  }

  100% {
    stroke-dashoffset: -216;
    transform: rotate(-360deg);
  }
`;

const Svg = styled(Icon).attrs(({ name }) => ({
  "data-cy": `svg-${name}`,
}))`
  max-width: 100px;
  width: 4em;
  fill: none;
  animation: 2s linear infinite ${svgAnimation};

  .animate-fg {
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    transform-origin: 50% 50%;
    animation: 1.4s ease-in-out infinite both ${fillAnimation};
  }
`;

const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.size.loadingHeight};
`;

const LoadingIcon = ({ name, bgColor, fgColor }: LoadingIconProps) => (
  <SvgWrapper>
    <Svg name={name}>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={bgColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="45" stroke={fgColor} className="animate-fg" />
    </Svg>
  </SvgWrapper>
);

export default LoadingIcon;
