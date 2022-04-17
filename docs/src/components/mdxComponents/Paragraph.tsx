import React from "react"
import {styled} from "linaria/react";
import {appTheme, tm, tmDark} from "../../themes";

const { media } = appTheme;

const StyledP = styled.p`
  margin: 16px 0 0;
  line-height: 1.7;
  font-size: 16px;
  font-family: ChivoLight, sans-serif;
  color: ${tm(({colors}) => colors.neutral800)};
  
  ${media.darkTheme} {
    color: ${tmDark(({colors}) => colors.neutral700)};
  }
`

const Paragraph = (props: any) => {
  console.log(props);
  
  return <StyledP>{props.children}</StyledP>
}

export default Paragraph
