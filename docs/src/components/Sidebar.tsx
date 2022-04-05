import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { styled } from "linaria/react";
import { tm } from "../themes";
import { DocumentationSidebarStructure } from "../config";

interface Props {
  elementsList: typeof DocumentationSidebarStructure;
}

const Container = styled.ul`
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  color: ${tm(({ colors }) => colors.neutral800)};
  font-family: ChivoRegular;
  font-weight: 400;
  font-size: 15px;
  line-height: 28px;
  letter-spacing: 0em;
`;

const SidebarLinkWrapper = styled.div`
  & > a {
    cursor: pointer;
    &:hover {
      color: ${tm(({ colors }) => colors.accent700)};
    }
  }
  &[data-active="true"] {
    color: ${tm(({ colors }) => colors.accent700)};
  }
`;

const SidebarItem = styled.li`
  display: flex;
  flex-direction: column;
  & ${SidebarLinkWrapper} {
    border-left: 4px solid transparent;
    padding: 4px 28px;
    &[data-active="true"] {
      font-family: ChivoBold;
      border-color: ${tm(({ colors }) => colors.accent700)};
    }
  }

  &.group {
    margin-top: 16px;
  }
`;

const SidebarHeading = styled.p`
  font-family: ChivoBold;
  font-size: 17px;
  line-height: 25px;
  padding: 4px 32px;
`;

const SidebarSubLinksList = styled.ul`
  display: flex;
  flex-direction: column;
  line-height: 28px;
  list-style-type: none;
  font-family: ChivoLight;
  & ${SidebarLinkWrapper} {
    padding: 0.5px 16px 0.5px 64px;
    &[data-active="true"] {
      font-family: ChivoLight;
      font-weight: 500;
    }
    &[data-anchor="true"] {
      border-left: none;
    }
  }
`;

const Sidebar = ({ elementsList }: Props) => {
  const router = useRouter();

  return (
    <Container>
      {elementsList.map((sidebarItem) => {
        const isLinkActive: boolean =
          Boolean(sidebarItem.href) && router?.pathname === sidebarItem.href;
        return (
          <SidebarItem key={sidebarItem.label} className={sidebarItem.type}>
            {sidebarItem.href !== undefined ? (
              <SidebarLinkWrapper data-active={isLinkActive}>
                <Link href={sidebarItem.href}>{sidebarItem.label}</Link>
              </SidebarLinkWrapper>
            ) : (
              <SidebarHeading>{sidebarItem.label}</SidebarHeading>
            )}

            {sidebarItem?.children && (
              <SidebarSubLinksList>
                {sidebarItem.children.map((subItem) => {
                  const isSubLinkActive = router?.asPath === subItem.href;
                  const isAnchor = router?.asPath.indexOf("#") > -1;
                  return (
                    <li key={subItem.label}>
                      <SidebarLinkWrapper
                        data-active={isSubLinkActive}
                        data-anchor={isAnchor}
                      >
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </SidebarLinkWrapper>
                    </li>
                  );
                })}
              </SidebarSubLinksList>
            )}
          </SidebarItem>
        );
      })}
    </Container>
  );
};

export default Sidebar;
