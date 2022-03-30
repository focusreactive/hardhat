import type { NextPage } from "next";
import LandingLayout from "../components/LandingLayout";
import HeroBlock from "../components/landingBlocks/HeroBlock";
import FeatureCard from "../components/ui/FeatureCard";
import { FeatureCards } from "../config";
import CTABlock from "../components/landingBlocks/CTABlock";
import WhyHardhatBlock, {
  defaultWhyHardhatContent,
} from "../components/landingBlocks/WhyHardhatBlock";
import defaultProps from "../components/ui/default-props";

const { defaultHeroBlockContent, defaultCTAContent } = defaultProps;
// import ToolsBlock from '../components/landingBlocks/ToolsBlock';

const Home: NextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "Hardhat",
        description:
          "Ethereum development environment for professionals by Nomic Foundation",
      }}
    >
      <HeroBlock content={defaultHeroBlockContent} />
      {/* Required confirmation from customers */}
      {/* <ToolsBlock /> */}
      <WhyHardhatBlock content={defaultWhyHardhatContent}>
        <FeatureCard content={FeatureCards.featureCardOne} isReversed />
        <FeatureCard content={FeatureCards.featureCardTwo} />
        <FeatureCard content={FeatureCards.featureCardThree} isReversed />
        <FeatureCard content={FeatureCards.featureCardFour} />
      </WhyHardhatBlock>
      <CTABlock content={defaultCTAContent} />
    </LandingLayout>
  );
};

export default Home;
