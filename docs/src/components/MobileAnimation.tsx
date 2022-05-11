import React from "react";
import Image from "next/image";
import { styled } from "linaria/react";

import ethereumLogo from "../assets/animation/mobile/ethereum_logo.svg";
import mascots from "../assets/animation/mobile/mascots.svg";
import heEyesOpen from "../assets/animation/mobile/he-eyes_open.svg";
import sheEyesOpen from "../assets/animation/mobile/she-eyes_open.svg";

const AnimationContainer = styled.section`
  width: 300px;
  height: 152px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);

  & > span {
    position: absolute;
  }

  & .ethereum-logo {
    bottom: 0;
    left: 50px;
  }
  & .mascots {
    bottom: 0;
    left: 0px;
  }

  & .he-eyes {
    bottom: 50px;
    left: 185px;
    animation: blink 8s linear infinite;
    animation-delay: 1s;
  }

  & .she-eyes {
    bottom: 60px;
    left: 50px;
    animation: blink 8s linear infinite;
  }

  @keyframes blink {
    0% {
      transform: none;
    }
    39% {
      transform: none;
    }
    40% {
      transform: matrix(1, 0, 0, 0.2, 0, 0);
    }
    41% {
      transform: none;
    }
    100% {
      transform: none;
    }
  }
`;

const MobileAnimation = () => {
  return (
    <AnimationContainer>
      <span className="ethereum-logo">
        <Image src={ethereumLogo} alt="ethereum logo" />
      </span>
      <span className="mascots">
        <Image src={mascots} alt="mascots" />
      </span>

      <span className="he-eyes">
        <Image src={heEyesOpen} alt="he-eyes" />
      </span>

      <span className="she-eyes">
        <Image src={sheEyesOpen} alt="she-eyes" />
      </span>
    </AnimationContainer>
  );
};

export default MobileAnimation;
