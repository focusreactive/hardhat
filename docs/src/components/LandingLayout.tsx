import React from "react";
import { styled } from "linaria/react";
import SEO from "./SEO";
import LandingNavigation from "./LandingNavigation";
import LandingFooter from "./LandingFooter";
import Banner from "./ui/Banner";
import { tm } from "../themes";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: ${tm(({ colors }) => colors.neutral0)};
    max-width: 960px;
  }
  height: 100vh;
  min-width: 320px;
`;

type Props = React.PropsWithChildren<{
  seo: {
    title: string;
    description: string;
  };
}>;

const LandingLayout = ({ children, seo }: Props) => {
  return (
    <Container>
      <Banner />
      <LandingNavigation />
      <SEO seo={seo} />
      <main>{children}</main>
      <LandingFooter />
    </Container>
  );
};

export default LandingLayout;
