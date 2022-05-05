import React from "react";
import Link from "next/link";
import { styled } from "linaria/react";
import { media, tm, tmDark, tmHCDark, tmSelectors } from "../themes";
import ExternalLinkIcon from "../assets/icons/external-link-icon";
import FooterArrow from "../assets/icons/footer-arrow";
import { FooterNavigation } from "./types";

type Props = FooterNavigation;

const Footer = styled.footer`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 74px;
  padding: 0 140px;
  & a {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const PageEdit = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  border-bottom: 1px solid ${tm(({ colors }) => colors.editPageColor)};
  color: ${tm(({ colors }) => colors.editPageColor)};
  stroke: ${tm(({ colors }) => colors.editPageColor)};
  ${tmSelectors.hcDark} {
    stroke: ${tmHCDark(({ colors }) => colors.editPageColor)};
    color: ${tmHCDark(({ colors }) => colors.editPageColor)};
    border-color: ${tmHCDark(({ colors }) => colors.editPageColor)};
  }
  ${tmSelectors.dark} {
    stroke: ${tmDark(({ colors }) => colors.editPageColor)};
    color: ${tmDark(({ colors }) => colors.editPageColor)};
    border-color: ${tmDark(({ colors }) => colors.editPageColor)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      stroke: ${tmDark(({ colors }) => colors.editPageColor)};
      color: ${tmDark(({ colors }) => colors.editPageColor)};
      border-color: ${tmDark(({ colors }) => colors.editPageColor)};
    }
  }
`;

const PageNavigation = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16px 0 48px;
`;

const PageNavigationLinkWrapper = styled.div`
  & .arrow-reversed {
    transform: scaleX(-1);
    margin-right: 12px;
  }
  & > a {
    display: inline-flex;
    align-items: center;
    & > span {
      margin-right: 12px;
    }
  }
  font-weight: 700;
  color: ${tm(({ colors }) => colors.accent700)};
  ${tmSelectors.hcDark} {
    color: ${tmHCDark(({ colors }) => colors.accent700)};
  }
  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.accent700)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.accent700)};
    }
  }
`;

const ImprovePageLinkWrapper = styled.div`
  & > a {
    display: inline-flex;
    align-items: center;
    & > span {
      margin-right: 10px;
    }
  }
`;

const LastUpdatedWrapper = styled.div`
  & > span:last-child {
    font-weight: 300;
    margin-left: 8px;
  }
`;

const DocumentationFooter = ({ next, prev, lastEditDate, editLink }: Props) => {
  const date = lastEditDate ? new Date(lastEditDate).toLocaleString() : "";
  return (
    <Footer>
      <PageEdit>
        {editLink ? (
          <ImprovePageLinkWrapper>
            <a href={editLink} target="_blank" rel="noopener noreferrer">
              <span>Help us improve this page</span>
              <ExternalLinkIcon />
            </a>
          </ImprovePageLinkWrapper>
        ) : (
          <div />
        )}
        {date ? (
          <LastUpdatedWrapper>
            <span>Last Updated:</span>
            <span>{date}</span>
          </LastUpdatedWrapper>
        ) : (
          <div />
        )}
      </PageEdit>
      <PageNavigation>
        {prev?.href !== undefined ? (
          <PageNavigationLinkWrapper>
            <Link href={prev.href}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <FooterArrow className="arrow-reversed" />
                <span>{prev.label}</span>
              </a>
            </Link>
          </PageNavigationLinkWrapper>
        ) : (
          <div />
        )}
        {next?.href !== undefined ? (
          <PageNavigationLinkWrapper>
            <Link href={next.href}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <span>{next.label}</span>
                <FooterArrow />
              </a>
            </Link>
          </PageNavigationLinkWrapper>
        ) : (
          <div />
        )}
      </PageNavigation>
    </Footer>
  );
};

export default DocumentationFooter;
