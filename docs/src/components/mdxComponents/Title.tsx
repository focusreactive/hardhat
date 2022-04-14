import React from "react";
import { styled } from "linaria/react";
import { appTheme, tm, tmDark } from "../../themes";

const { media } = appTheme;

interface Props {
  children: string;
}

const StyledH2 = styled.h2`
  display: block;
  margin-block-start: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${tm(({ colors }) => colors.neutral400)};
  font-family: ChivoRegular, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};

  & > a {
    margin-left: -24px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent700)};
  }

  &:hover > a {
    opacity: 1;

    &:hover {
      text-decoration: underline;
    }
  }

  ${media.darkTheme} {
    border-bottom-color: ${tmDark(({ colors }) => colors.border)};
    color: ${tmDark(({ colors }) => colors.neutral800)};
  }
`;

const H2 = ({ children }: Props) => {
  return (
    <StyledH2>
      <a href={`#${children.toLowerCase().replace(" ", "-")}`}>#</a>
      {` ${children}`}
    </StyledH2>
  );
};

const Title = {
  H2,
};

export default Title;
