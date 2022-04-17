import React from "react";
import { styled } from "linaria/react";
import { NextComponentType } from "next";
import { appTheme, tm, tmDark } from "../../themes";

const { media } = appTheme;

const StyledCode = styled.code`
  padding: 4px 8px;
  background-color: ${tm(({ colors }) => colors.codeBackground)};
  border-radius: 3px;
  font-size: 14px;
  font-family: ChivoLight, sans-serif;
  font-weight: 600;
  line-height: 1.7;
  letter-spacing: 2px;
  color: ${tm(({ colors }) => colors.codeColor)};

  ${media.darkTheme} {
    background-color: ${tmDark(({ colors }) => colors.neutral200)};
    color: ${tmDark(({ colors }) => colors.codeColor)};
  }
`;

const Code: NextComponentType = ({ children }) => {
  return <StyledCode>{children}</StyledCode>;
};

export default Code;
