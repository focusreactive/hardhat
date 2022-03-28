import React, { useMemo } from 'react';
import { styled } from 'linaria/react';

import TrustedTeamsLogos from '../../assets/images/trustedTeamsLogos';

import { appTheme, tm } from '../../themes';

const content = {
  title: 'Trusted by top teams',
};

type Props = {
  content: typeof content;
};

const { media } = appTheme;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  margin-bottom: 48px;
  text-align: center;
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: ChivoBold, sans-serif;
  color: ${tm(({ colors }) => colors.neutral900)};

  ${media.lg} {
    margin-bottom: 88px;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: initial;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogosRowContainer = styled.div`
  display: flex;
  width: 10000px;

  &:nth-last-child(-n + 3) {
    display: none;
  }

  ${media.lg} {
    &:nth-last-child(-n + 5) {
      display: none;
    }
  }
`;

const LogosSubrowContainer = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  animation-duration: 50s;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: initial;
  float: left;

  &[data-reverted='true'] {
    animation-direction: reverse;
  }

  ${media.lg} {
    height: 67px;
    margin-bottom: 32px;
  }

  & img {
    width: 100%;
    margin: 0 20px;
    max-height: 67px;

    ${media.lg} {
      margin: 0 50px;
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
`;

const logosRowsCreator = (rowsAmount: number) => {
  const logosInRowAmount = Math.floor(TrustedTeamsLogos.length / rowsAmount);
  const logosRows = [];

  for (let i = 0; i < rowsAmount; i++) {
    const rowImages = TrustedTeamsLogos.slice(i * logosInRowAmount, (i + 1) * logosInRowAmount).map((logo) => (
      <img src={logo.img.src} alt={logo.alt} key={logo.alt} />
    ));

    logosRows.push(
      <LogosRowContainer>
        <LogosSubrowContainer data-reverted={i % 2 === 0}>{rowImages}</LogosSubrowContainer>
        <LogosSubrowContainer data-reverted={i % 2 === 0}>{rowImages}</LogosSubrowContainer>
      </LogosRowContainer>
    );
  }
  return logosRows;
};

const TrustedTeamsBlock = ({ content }: Props) => {
  const threeRows = useMemo(() => logosRowsCreator(3), []);
  const fiveRows = useMemo(() => logosRowsCreator(5), []);

  return (
    <Section>
      <Title>{content.title}</Title>
      <LogosContainer>
        {threeRows}
        {fiveRows}
      </LogosContainer>
    </Section>
  );
};

export default TrustedTeamsBlock;

TrustedTeamsBlock.defaultProps = { content };
