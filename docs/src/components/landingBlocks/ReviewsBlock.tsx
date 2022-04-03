import React, { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import { styled } from "linaria/react";

import CarouselArrowLeft from "../../assets/images/carrusel-arrow-left.png";

import Section from "../Section";
import defaultProps from "../ui/default-props";
import { appTheme, tm } from "../../themes";

const { media } = appTheme;

const SliderWrapper = styled.div`
  margin-bottom: 240px;
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${media.lg} {
    padding: 25px;
    height: 490px;
    flex-direction: row;
  }
`;

const ImageWithCaptionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  ${media.lg} {
    width: 30%;
    align-items: center;
    padding: 20px 10px 0;
    flex-direction: column;
  }
`;

const PersonImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 100px;

  ${media.lg} {
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
  }
`;

const PersonCaption = styled.div`
  margin-left: 30px;
  text-align: left;
  font-family: ChivoRegular, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;

  ${media.lg} {
    margin-left: 0;
    text-align: center;

    & > p {
      display: inline;
    }

    & > img {
      display: block;
      margin: 16px auto 0;
    }
  }
`;

const CommentContainer = styled.p`
  text-align: left;
  font-family: ChivoRegular, sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 28px;
  color: ${tm(({ colors }) => colors.neutral600)};

  ${media.lg} {
    width: 70%;
    padding: 24px;
    align-self: center;
  }
`;

const SliderArrow = styled.button`
  position: absolute;
  width: 34px;
  height: 34px;
  top: 30px;
  z-index: 1;
  background-color: ${tm(({ colors }) => colors.neutral0)};
  border: none;
  box-shadow: 0 3px 6px ${tm(({ colors }) => colors.sliderButtonShadow)};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.right {
    right: -20px;
    transform: rotate(180deg);
    & > img {
      margin-top: 5px;
    }
  }

  &.left {
    left: -20px;

    & > img {
      margin-top: 2px;
    }
  }

  ${media.lg} {
    width: 48px;
    height: 48px;
    top: 210px;

    &:hover {
      top: 205px;
      box-shadow: 0 8px 20px
        ${tm(({ colors }) => colors.sliderButtonHoverShadow)};
    }

    &.right {
      right: -80px;
    }

    &.left {
      left: -80px;
    }
  }
`;

const ReviewsBlock = () => {
  const slides = useMemo(
    () =>
      defaultProps.defaultReviewsBlockContent.map((item) => (
        <SlideContainer key={item.name}>
          <ImageWithCaptionContainer>
            <PersonImage src={item.personImage.src} alt={item.name} />
            <PersonCaption>
              <p>{item.name},</p>
              <p> {item.position}</p>
              <img src={item.companyImage.src} alt={item.alt} />
            </PersonCaption>
          </ImageWithCaptionContainer>
          <CommentContainer>{item.comment}</CommentContainer>
        </SlideContainer>
      )),
    []
  );

  return (
    <Section>
      <SliderWrapper>
        <Carousel
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          renderArrowNext={(clickHandler, hasNext, label) =>
            hasNext && (
              <SliderArrow
                onClick={clickHandler}
                title={label}
                className="right"
              >
                <img src={CarouselArrowLeft.src} alt="Carousel next button" />
              </SliderArrow>
            )
          }
          renderArrowPrev={(clickHandler, hasPrev, label) =>
            hasPrev && (
              <SliderArrow
                onClick={clickHandler}
                title={label}
                className="left"
              >
                <img src={CarouselArrowLeft.src} alt="Carousel next button" />
              </SliderArrow>
            )
          }
        >
          {slides}
        </Carousel>
      </SliderWrapper>
    </Section>
  );
};

export default ReviewsBlock;
