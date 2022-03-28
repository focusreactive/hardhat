import type { NextPage } from "next";
import LandingLayout from "../components/LandingLayout";
import HeroBlock from "../components/landingBlocks/HeroBlock";
import WhyHardhatBlock from "../components/landingBlocks/WhyHardhatBlock";
import FeatureCard from "../components/ui/FeatureCard";
import { FeatureCards } from "../config";
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
      <HeroBlock />
      {/* Required confirmation from customers */}
      {/* <ToolsBlock /> */}
      <WhyHardhatBlock>
        <FeatureCard content={FeatureCards.featureCardOne} isReversed={true} />
        <FeatureCard content={FeatureCards.featureCardTwo} />
        <FeatureCard
          content={FeatureCards.featureCardThree}
          isReversed={true}
        />
        <FeatureCard content={FeatureCards.featureCardFour} />
      </WhyHardhatBlock>
    </LandingLayout>
  );
};

export default Home;
