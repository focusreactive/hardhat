import type { NextPage } from "next";
import LandingLayout from "../components/LandingLayout";
import HeroBlock from "../components/landingBlocks/HeroBlock";
import WhyHardhatBlock from "../components/landingBlocks/WhyHardhatBlock";
// import ToolsBlock from '../components/landingBlocks/ToolsBlock';

const Home: NextPage = () => {
  return (
    <>
      <HeroBlock />
      <WhyHardhatBlock />

      {/* Required confirmation from customers */}
      {/* <ToolsBlock /> */}
    </>
  );
};

Home.layout = "landing";

export default Home;
