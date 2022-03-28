import { MenuItemType } from "./components/ui/types";
import SolidityImageDesktop from "./assets/feature-cards/Desktop/SolidityImage.png";
import SolidityImageMobile from "./assets/feature-cards/Mobile/SolidityImage.png";
import FlexibilityImageDesktop from "./assets/feature-cards/Desktop/FlexibilityImage.png";
import FlexibilityImageMobile from "./assets/feature-cards/Mobile/FlexibilityImage.png";
import ExtensibleImageDesktop from "./assets/feature-cards/Desktop/ExtensibleImage.png";
import ExtensibleImageMobile from "./assets/feature-cards/Mobile/ExtensibleImage.png";
import FastIterationImageDesktop from "./assets/feature-cards/Desktop/FastIterationImage.png";
import FastIterationImageMobile from "./assets/feature-cards/Mobile/FastIterationImage.png";

export const defaultMenuItemsList: MenuItemType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tools",
    href: "/tools",
    subItems: [
      {
        prefix: "Hardhat",
        label: "Runner",
        href: "/tools/runner",
      },
      {
        prefix: "Hardhat",
        label: "Ignition",
        href: "/tools/ignition",
      },
      {
        prefix: "Hardhat",
        label: "Network",
        href: "/tools/network",
      },
      {
        prefix: "Hardhat",
        label: "Solidity",
        href: "/tools/solidity",
      },
    ],
  },
  {
    label: "Plugins",
    href: "/plugins",
  },
  {
    label: "Documents",
    href: "/documents",
  },
  {
    label: "Tutorial",
    href: "/tutorial",
  },
];

export enum Tools {
  RUNNER = "RUNNER",
  IGNITION = "IGNITION",
  NETWORK = "NETWORK",
  VS_CODE = "VS_CODE",
}

export const FeatureCards = {
  featureCardOne: {
    mobileImg: SolidityImageMobile,
    desktopImg: SolidityImageDesktop,
    cta: {
      url: "/hardhat-network/#console-log",
      title: "Get started with Solidity console.log",
    },
    articleOne: {
      title: "Run Solidity locally",
      text: "Easily deploy your contracts, run tests and debug Solidity code without dealing with live environments. Hardhat Network is a local Ethereum network designed for development.",
    },
    articleTwo: {
      title: "Debugging-first ",
      text: "Hardhat is the best choice for Solidity debugging. You get Solidity stack traces, console.log and explicit error messages when transactions fail.",
    },
  },
  featureCardTwo: {
    mobileImg: FlexibilityImageMobile,
    desktopImg: FlexibilityImageDesktop,
    cta: {
      url: "/guides/create-task.html",
      title: "Learn more about extending Hardhat",
    },
    articleOne: {
      title: "Extreme flexibility",
      text: "Change anything you like. Even entire out-of-the-box tasks, or just parts of them. Flexible and customizable design, with little constraints.",
    },
    articleTwo: {
      title: "Bring your own tools",
      text: "Designed to make integrations easy, Hardhat allows you to keep using your existing tools while enabling deeper interoperability between them.",
    },
  },
  featureCardThree: {
    mobileImg: ExtensibleImageMobile,
    desktopImg: ExtensibleImageDesktop,
    cta: { url: "/plugins", title: "Get started with plugins" },
    articleOne: {
      title: "Fully extensible",
      text: "A tooling platform designed to be extended, Hardhat has all the utilities you need to address your project-specific needs.",
    },
    articleTwo: {
      title: "Plugin ecosystem",
      text: "Extend Hardhat with a composable ecosystem of plugins that add functionality and integrate your existing tools into a smooth workflow.",
    },
  },
  featureCardFour: {
    mobileImg: FastIterationImageMobile,
    desktopImg: FastIterationImageDesktop,
    cta: {
      url: "/guides/typescript.html",
      title: "Get started with TypeScript",
    },
    articleOne: {
      title: "Fast iteration",
      text: "Keep your momentum going by making your development feedback loop up to 10x faster with Hardhat.",
    },
    articleTwo: {
      title: "TypeScript",
      text: "Catch mistakes before you even run your code by switching to a typed language. Hardhat provides full native support for TypeScript.",
    },
  },
};
