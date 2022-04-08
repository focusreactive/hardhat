import React, { FC, useContext } from "react";
import { styled } from "linaria/react";
import Link from "next/link";
import { darkTheme, lightTheme, ThemeContext, ThemesEnum, tm } from "../themes";
import HardhatLogo from "../assets/hardhat-logo";
import Hamburger from "./ui/Hamburger";
import Menu from "./ui/DesktopMenu";
import { menuItemsList, socialsItems } from "../config";
import ThemeSwitcher from "../assets/icons/theme-switcher";

const { media } = lightTheme;

interface Props {
  isSidebarOpen: boolean;
  onSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationStyled = styled.nav`
  position: relative;
  margin-top: 40px;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
  box-sizing: border-box;
  padding: 32px 24px;
  transition: all ease-in-out 0.25s;
  background-color: ${tm(({ colors }) => colors.neutral200)};
  border-bottom: 1px solid ${tm(({ colors }) => colors.transparent)};
  z-index: 10;
  ${media.lg} {
    padding: 24px;
  }
  &[data-theme="DARK"] {
    border-bottom: 1px solid ${tm(({ colors }) => colors.neutral400)};
  }
`;

const ControlsContainer = styled.section`
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${tm(({ colors }) => colors.transparent)};
  box-sizing: border-box;
`;

const LogoContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;
  background-color: ${tm(({ colors }) => colors.transparent)};
  border: none;
  cursor: pointer;
`;

const HamburgerLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const HamburgerWrapper = styled.div`
  ${media.md} {
    display: none;
  }
`;

const ThemeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${tm(({ colors }) => colors.transparent)};
  border: none;
  cursor: pointer;
  transform-origin: center;
  transition: transform ease-in-out 0.25s;
  &:hover {
    opacity: 0.8;
  }
  &[data-theme="DARK"] {
    transform: scaleX(-1);
  }
`;

const Navigation: FC<Props> = ({ isSidebarOpen, onSidebarOpen }) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);

  return (
    <NavigationStyled data-theme={theme}>
      <ControlsContainer>
        <HamburgerLogoWrapper>
          <HamburgerWrapper>
            <Hamburger
              isOpen={isSidebarOpen}
              onClick={() => onSidebarOpen(!isSidebarOpen)}
            />
          </HamburgerWrapper>

          <Link href="/" passHref>
            <LogoContainer>
              <HardhatLogo
                fill={
                  theme === ThemesEnum.DARK ? darkTheme.colors.neutral900 : ""
                }
              />
            </LogoContainer>
          </Link>
        </HamburgerLogoWrapper>

        <Menu
          isDocumentation
          menuItems={menuItemsList}
          socialsItems={socialsItems}
        />
        <ThemeButton onClick={() => onChangeTheme()} data-theme={theme}>
          <ThemeSwitcher />
        </ThemeButton>
      </ControlsContainer>
    </NavigationStyled>
  );
};

export default Navigation;
