import React from "react";
import Image from "next/image";
import { styled } from "linaria/react";

interface Props {
  src: string;
  alt: string;
}

const ImageContainer = styled.div`
  display: inline;
  max-width: 100%;
  position: relative;
  width: ${({ width }) => width};
  height: auto;
  & .md-img {
    position: relative !important;
    height: unset !important;
  }
  & span {
    padding: 0 !important;
  }
`;

const isBadge = (src: string): boolean => /img\.shields\.io/.test(src);

const MDImage = ({ src, alt }: Props) => {
  return (
    <ImageContainer width={isBadge(src) ? "80px" : null}>
      <Image
        className="md-img"
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={src}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </ImageContainer>
  );
};

export default MDImage;
