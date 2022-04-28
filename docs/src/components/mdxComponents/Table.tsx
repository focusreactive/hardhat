import React from "react";
import { styled } from "linaria/react";
import { media, tm, tmDark, tmHCDark, tmSelectors } from "../../themes";

interface Props {
  children: string;
}

const StyledTable = styled.table`
  margin: 16px 0;
  border-collapse: collapse;
  border-color: ${tm(({ colors }) => colors.neutral800)};
  overflow-x: auto;
  & thead {
    vertical-align: middle;
  }
  & th {
    font-weight: bold;
  }
  & th,
  & td {
    border: 1px solid ${tm(({ colors }) => colors.tableBorder)};
    padding: 9.6px 16px;
  }

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

const Table = ({ children }: Props) => {
  return <StyledTable>{children}</StyledTable>;
};

export default Table;
