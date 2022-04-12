import React, { useEffect, useRef } from "react";
import { styled } from "linaria/react";

import Section from "../Section";
import CTA from "../ui/CTA";
import { appTheme } from "../../themes";
import { CTAType } from "../ui/types";
import { initHeroAnimation } from "../../content/hero-animation-functions";

const { media } = appTheme;

interface Props {
  content: {
    title: string;
    tagline: string;
    cta: CTAType;
  };
}

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  ${media.lg} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0 24px;
  & svg {
    margin: 0 auto;
  }
  ${media.lg} {
    width: 40%;
    &:first-child {
      width: 60%;
    }
    padding: 0;
    & svg {
      position: relative;
      right: -10%;
    }
  }
`;

const TagLine = styled.span`
  font-family: ChivoLight, sans-serif;
  margin-bottom: 24px;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.02em;
  text-align: left;
  ${media.lg} {
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0;
    text-align: left;
    margin-top: 32px;
  }
`;

const Title = styled.h1`
  margin-bottom: 48px;
  font-size: 40px;
  line-height: 45px;
  letter-spacing: -0.01em;
  ${media.lg} {
    margin-bottom: 64px;
    font-size: 72px;
    line-height: 72px;
    letter-spacing: 0;
  }
`;

const HeroBlock = ({ content }: Props) => {
  const canvasEl = useRef(null);
  const animationContainerEl = useRef(null);
  const domOverlayContainerEl = useRef(null);

  var canvas,
    stage,
    exportRoot,
    anim_container,
    dom_overlay_container,
    fnStartAnimation;
  function init() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    var comp = AdobeAn.getComposition("36A1779EF9C24DC9B80C7DE50F290651");
    var lib = comp.getLibrary();
    handleComplete({}, comp);
  }
  function handleComplete(evt, comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib = comp.getLibrary();
    var ss = comp.getSpriteSheet();
    exportRoot = new lib.Harhdatherov9reduccionpeso();
    stage = new lib.Stage(canvas);
    //Registers the "tick" event listener.
    fnStartAnimation = function () {
      stage.addChild(exportRoot);
      createjs.Ticker.framerate = lib.properties.fps;
      createjs.Ticker.addEventListener("tick", stage);
    };
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false, "both", false, 1, [
      canvas,
      anim_container,
      dom_overlay_container,
    ]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
  }

  useEffect(() => {
    // @ts-ignore
    init();
    // initHeroAnimation();
  }, []);

  return (
    <Section>
      <Container>
        <Block>
          <TagLine>{content.tagline}</TagLine>
          <Title>{content.title}</Title>
          <CTA href={content.cta.url}>{content.cta.title}</CTA>
        </Block>
        <Block>
          <div
            id="animation_container"
            ref={animationContainerEl}
            style={{
              backgroundColor: "rgba(255, 255, 255, 1.00)",
              width: "1120px",
              height: "693px",
            }}
          >
            <canvas
              id="canvas"
              width="1120"
              height="693"
              ref={canvasEl}
              style={{
                position: "absolute",
                display: "block",
                backgroundColor: "rgba(255, 255, 255, 1.00)",
              }}
            />
            <div
              id="dom_overlay_container"
              ref={domOverlayContainerEl}
              style={{
                pointerEvents: "none",
                overflow: "hidden",
                width: "1120px",
                height: "693px",
                position: "absolute",
                left: "0",
                top: "0",
                display: "block",
              }}
            />
          </div>
        </Block>
      </Container>
    </Section>
  );
};

export default HeroBlock;
