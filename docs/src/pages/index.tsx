import type { NextPage } from "next";
import HeroBlock from "../components/landingBlocks/HeroBlock";
import WhyHardhatBlock, {
  defaultWhyHardhatContent,
} from "../components/landingBlocks/WhyHardhatBlock";
import defaultProps from "../components/ui/default-props";

const { defaultHeroBlockContent } = defaultProps;
// import ToolsBlock from '../components/landingBlocks/ToolsBlock';

const Home: NextPage = () => {
  return (
    <>
      <HeroBlock content={defaultHeroBlockContent} />
      <WhyHardhatBlock content={defaultWhyHardhatContent} />

      {/* Required confirmation from customers */}
      {/* <ToolsBlock /> */}
    </>
  );
};

Home.layout = "landing";

export default Home;
