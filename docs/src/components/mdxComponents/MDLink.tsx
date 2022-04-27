import React from "react";
import { styled } from "linaria/react";
import { media, tm, tmDark, tmHCDark, tmSelectors } from "../../themes";
import ExternalLinkIcon from "../../assets/icons/external-link-icon";

interface Props {
  children: string;
}

const StyledMdLink = styled.a`
  margin: 0 2px;
  display: inline-flex;
  align-items: center;
  color: ${tm(({ colors }) => colors.link)};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  & code {
    color: ${tm(({ colors }) => colors.link)};
  }

  & > svg {
    margin-left: 2px;
    stroke: ${tmDark(({ colors }) => colors.neutral800)};
    ${tmSelectors.hcDark} {
      stroke: ${tmHCDark(({ colors }) => colors.neutral800)};
    }
    ${tmSelectors.dark} {
      stroke: ${tmDark(({ colors }) => colors.neutral800)};
    }
    ${media.mqDark} {
      ${tmSelectors.auto} {
        stroke: ${tmDark(({ colors }) => colors.neutral800)};
      }
    }
  }
`;

const MDLink = ({ children }: Props) => {
  return (
    <StyledMdLink>
      {children}
      {<ExternalLinkIcon />}
    </StyledMdLink>
  );
};

export default MDLink;
