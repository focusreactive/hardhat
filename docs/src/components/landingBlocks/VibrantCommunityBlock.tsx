import React from 'react';
import Image from 'next/image';
import { styled } from 'linaria/react';

import VibrantCommunityImage from '../../assets/images/vibrant_community.png';

import { appTheme, tm } from '../../themes';

const { media } = appTheme;

const content = {
  title: 'Vibrant community',
  text: 'Great tech attracts great people. Join the Hardhat community to find answers to your problems and contribute to the plugin ecosystem.',
  cta: {
    title: 'Join the Hardhat Discord',
    // TODO: switch to page reference later
    url: 'https://hardhat.org/getting-started/',
  },
};

type Props = {
  content: typeof content;
};

const Section = styled.section`
  margin: 0 24px;
  ${media.lg} {
    margin: 0 75px 0 85px;
  }
`;

const Container = styled.div`
  padding-top: 251px;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  ${media.lg} {
    padding: 0;
    flex-direction: row;
    justify-content: center;
  }
  box-shadow: 0 6px 50px rgba(10, 10, 10, 0.08);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${media.lg} {
    width: 477px;
    margin: 110px 0 40px;
  }
`;

const ImageContainer = styled.div`
  width: 346px;
  left: calc(50% - 346px / 2);
  top: -20.5px;
  position: absolute;
  ${media.lg} {
    margin-top: 43px;
    width: 530px;
    position: initial;
  }
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 400;
  font-family: ChivoRegular, sans-serif;
  color: ${tm(({ colors }) => colors.neutral900)};
  ${media.lg} {
    margin-left: 6px;
    text-align: left;
  }
`;

const Text = styled.p`
  margin: 0 8px 32px;
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  font-family: ChivoLight, sans-serif;
  color: ${tm(({ colors }) => colors.neutral600)};
  ${media.lg} {
    margin: 0 6px 82px;
    text-align: left;
  }
`;

const CTA = styled.a`
  width: 232px;
  margin-bottom: 48px;
  padding: 12px 0;
  border: 1px solid ${tm(({ colors }) => colors.neutral700)};
  border-radius: 4px;
  align-self: center;
  text-align: center;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  font-family: ChivoRegular, sans-serif;
  color: ${tm(({ colors }) => colors.neutral900)};
  transition: 0.5s;

  &:focus {
    border-color: ${tm(({ colors }) => colors.neutral100)};
    background-color: ${tm(({ colors }) => colors.neutral100)};
  }
  
  ${media.lg} {
    align-self: start;
  }
}
`;

const VibrantCommunityBlock = ({ content }: Props) => {
  return (
    <Section>
      <Container>
        <Wrapper>
          <Title>{content.title}</Title>
          <Text>{content.text}</Text>
          <CTA href={content.cta.url}>{content.cta.title}</CTA>
        </Wrapper>
        <ImageContainer>
          <Image src={VibrantCommunityImage} alt={'Vibrant community image'} />
        </ImageContainer>
      </Container>
    </Section>
  );
};

export default VibrantCommunityBlock;

VibrantCommunityBlock.defaultProps = { content };
