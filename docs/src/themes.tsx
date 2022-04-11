import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createTheming } from "@callstack/react-theme-provider";
import useThemeDetector from "./hooks/useThemeDetector";

export { styled } from "linaria/react";

/* eslint-disable */
export enum ThemesEnum {
  LIGHT = "LIGHT",
  DARK = "DARK",
  AUTO = "AUTO",
}
/* eslint-enable */

const { LIGHT, DARK, AUTO } = ThemesEnum;

const breakpoints = {
  xs: 360,
  sm: 412,
  md: 1020,
  lg: 1440,
};

const media = {
  xs: `@media screen and (min-width: ${breakpoints.xs}px)`,
  sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
  md: `@media screen and (min-width: ${breakpoints.md}px)`,
  lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
};

export const lightTheme = {
  colors: {
    transparent: "transparent",
    neutral0: "#FFFFFF",
    neutral100: "#F2F2F2",
    neutral200: "#FCFCF1",
    neutral400: "#C4C4C4",
    neutral500: "#4B4D4D",
    neutral600: "#6E6F70",
    neutral700: "#9B9FA8",
    neutral800: "#16181D",
    neutral900: "#0A0A0A",
    accent100: "#FBFCDB",
    accent600: "#FFF04D",
    accent700: "#CCB200",
    accent800: "#FFF100",
    accent900: "#EDCF00",
    border: "transparent",
    complementary600: "#E9DEFA",
    cardBoxShadow: "#0A0A0A14",
    sliderButtonShadow: "rgba(0, 0, 0, 0.102)",
    sliderButtonHoverShadow: "hsl(0deg 0% 83% / 50%)",
    toolsBlockBorder: "#d4d4d4",
    mottoRunnerBackground: "#F8F4CB",
    mottoNetworkBackground: "#f6edd1",
    mottoIgnitionBackground: "#f3ecf3",
    mottoVscodeBackground: "#f0e7fb",
  },
  media,
  breakpoints,
};

export const darkTheme = {
  colors: {
    transparent: "transparent",
    neutral0: "#16181D",
    neutral100: "#F2F2F2",
    neutral200: "#16181D",
    neutral400: "#4B4D4D",
    neutral500: "#4B4D4D",
    neutral600: "#6E6F70",
    neutral700: "#9B9FA8",
    neutral800: "#B0B2B5",
    neutral900: "#FFFFFF",
    accent100: "#FBFCDB",
    accent600: "#FFF04D",
    accent700: "#CCB200",
    accent800: "#FFF100",
    accent900: "#EDCF00",
    border: "#4B4D4D",
    complementary600: "#E9DEFA",
    cardBoxShadow: "#0A0A0A14",
    sliderButtonShadow: "rgba(0, 0, 0, 0.102)",
    sliderButtonHoverShadow: "hsl(0deg 0% 83% / 50%)",
    toolsBlockBorder: "#d4d4d4",
    mottoRunnerBackground: "#F8F4CB",
    mottoNetworkBackground: "#f6edd1",
    mottoIgnitionBackground: "#f3ecf3",
    mottoVscodeBackground: "#f0e7fb",
  },
  media,
  breakpoints,
};

export const mapTheme: { [key in ThemesEnum]: typeof lightTheme } = {
  [AUTO]: darkTheme,
  [LIGHT]: lightTheme,
  [DARK]: darkTheme,
};

const themesArray = Object.values(ThemesEnum);

export const getNextTheme = (currentTheme: ThemesEnum): ThemesEnum => {
  const currentThemeIndex = themesArray.indexOf(currentTheme);
  const nextThemeIndex =
    currentThemeIndex === themesArray.length - 1 ? 0 : currentThemeIndex + 1;
  const nextTheme = themesArray[nextThemeIndex];
  return nextTheme;
};

const theming = createTheming(lightTheme);

interface IThemeContext {
  theme: ThemesEnum;
  changeTheme: () => void;
}

interface IThemeProvider {
  theme: ThemesEnum;
  onChangeTheme: React.Dispatch<SetStateAction<ThemesEnum>>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: LIGHT,
  changeTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme,
  onChangeTheme,
}: React.PropsWithChildren<IThemeProvider>): JSX.Element => {
  const [currentThemeObject, setCurrentThemeObject] = useState(lightTheme);

  const changeTheme = useCallback(() => {
    const newTheme = ThemesEnum[getNextTheme(theme)];
    localStorage.setItem("theme", newTheme);
    onChangeTheme(newTheme);
  }, [theme, onChangeTheme]);

  const isAutoThemeDark = useThemeDetector();

  useEffect(() => {
    mapTheme[AUTO] = isAutoThemeDark ? darkTheme : lightTheme;
  }, [isAutoThemeDark]);

  useEffect(() => {
    setCurrentThemeObject(mapTheme[theme]);
  }, [theme]);

  const initialContext = useMemo(
    () => ({ theme, changeTheme }),
    [theme, changeTheme]
  );

  return (
    <ThemeContext.Provider value={initialContext}>
      <theming.ThemeProvider theme={currentThemeObject}>
        {children}
      </theming.ThemeProvider>
    </ThemeContext.Provider>
  );
};

type ThemeSelect = (tm: typeof lightTheme) => string;

export const tm = (cb: ThemeSelect) => () =>
  ((fn) => fn(theming.useTheme()))(cb);
