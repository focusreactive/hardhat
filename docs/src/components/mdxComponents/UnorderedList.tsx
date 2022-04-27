import React from "react";
import { styled } from "linaria/react";
import { appTheme, tm, tmDark, tmHCDark, tmSelectors } from "../../themes";

const { media } = appTheme;

interface Props {
  children: string;
}

const StyledUnorderedList = styled.ul`
  padding-left: 1.2em;
  line-height: 1.7;
  color: ${tm(({ colors }) => colors.neutral800)};

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.neutral800)};
  }

  ${tmSelectors.hcDark} {
    color: ${tmHCDark(({ colors }) => colors.neutral800)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.neutral800)};
    }
  }
`;

const UnorderedList = ({ children }: Props) => {
  return <StyledUnorderedList>{children}</StyledUnorderedList>;
};

export default UnorderedList;
