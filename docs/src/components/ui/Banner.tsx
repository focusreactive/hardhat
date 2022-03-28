import React, { useState, useEffect } from "react";
import { styled } from "linaria/react";
import { appTheme, tm } from "../../themes";
import useWindowSize from "../../hooks/useWindowSize";

const defaultBannerContent = {
  text: "Join the Hardhat team! Nomic Labs is hiring",
  href: "https://www.notion.so/Nomic-Foundation-jobs-991b37c547554f75b89a95f437fd5056",
};

type BannerProps = {
  content: typeof defaultBannerContent;
  renderContent: ({
    content,
  }: {
    content: typeof defaultBannerContent;
  }) => JSX.Element;
};

interface DefaultBannerProps {
  content: typeof defaultBannerContent;
}

const BannerContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 100;
  width: 100%;
  height: 40px;
  display: flex;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${tm(({ colors }) => colors.neutral900)};
  color: ${tm(({ colors }) => colors.neutral0)};
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.03em;
  cursor: pointer;
  & span {
    margin-right: 2px;
  }
  & span:last-child {
    text-decoration: underline;
    margin-right: unset;
  }
`;

const BracesContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  & > div {
    color: ${tm(({ colors }) => colors.accent900)};
    display: inline;
    transition: color ease-out 0.5s;
    margin: 0 4px;
  }
  & .reversed {
    transform: rotate(180deg);
  }
`;

const Brace = styled.div<{
  fullAnimationDuration: number;
  braceNumber: number;
}>`
  display: inline;
  animation: highlight ease-out ${(props) => `${props.fullAnimationDuration}s`};
  animation-iteration-count: 3;
  animation-delay: ${(props) => `${props.braceNumber * 0.5}s`};
  @keyframes highlight {
    0%,
    100% {
      color: ${tm(({ colors }) => colors.accent900)};
    }

    10% {
      color: ${tm(({ colors }) => colors.neutral900)};
    }

    20% {
      color: ${tm(({ colors }) => colors.accent900)};
    }
  }
`;

const BracesAnimation: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const windowSize = useWindowSize();
  const { breakpoints } = appTheme;

  const bracesCount =
    windowSize.width >= breakpoints.lg
      ? 6
      : windowSize.width > breakpoints.sm
      ? 3
      : 2;

  const bracesString = Array(bracesCount)
    .fill(">")
    .map((brace: string, index: number) => {
      return (
        <Brace
          key={index}
          fullAnimationDuration={bracesCount * 0.5}
          braceNumber={index + 1}
        >
          {brace}
        </Brace>
      );
    });

  return (
    <BracesContainer>
      <div className="braces reversed">{bracesString}</div>
      {children}
      <div className="braces">{bracesString}</div>
    </BracesContainer>
  );
};

export const DefaultBanner = ({ content }: DefaultBannerProps) => {
  return <BracesAnimation>{content.text}</BracesAnimation>;
};

const Banner = (props: BannerProps) => {
  const { content, renderContent } = props;
  return (
    <a target="_blank" rel="noreferrer" href={content.href}>
      <BannerContainer>{renderContent({ content })}</BannerContainer>
    </a>
  );
};

export default Banner;

Banner.defaultProps = {
  content: defaultBannerContent,
  renderContent: ({ content }: DefaultBannerProps) => (
    <DefaultBanner content={content} />
  ),
};
