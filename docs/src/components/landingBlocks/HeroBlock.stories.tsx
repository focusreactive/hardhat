import React, { useRef } from "react";
import HeroBlock from "./HeroBlock";
import homepageContent from "../../content/home";

const { heroBlockContent } = homepageContent;

export default {
  title: "Landing Blocks/Hero",
};

export const Default = () => {
  const ref = useRef(null);
  return <HeroBlock content={heroBlockContent} mainRef={ref} />;
};
