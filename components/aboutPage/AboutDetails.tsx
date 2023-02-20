"use client";

import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef } from "react";
import gsap, { Power4 } from "gsap";
import AboutSlider from "./AboutSlider";
import { TDetailsInfoSet } from "../../types/typings";
import { generatePropertiesForTimelineInEveryResolution } from "../../utils/animations";
import useDeviceSize from "../../hooks/useDeviceSize";

type Props = {
  detailsInfoSet: TDetailsInfoSet;
};

const AboutDetails = (props: Props) => {
  ////vars
  const { detailsInfoSet } = props;
  const {
    logoImageURL,
    clipPathName,
    sectionPurposeName,
    paragraphText,
    sliders,
    isFirstSectionThenNoTopMargin,
  } = detailsInfoSet;

  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const graphsRef = useRef<HTMLDivElement>(null);

  const [width, height] = useDeviceSize();
  const getWidthSizeByName = (width: number) => {
    if (width < 768) return "mobile";
    if (width > 769) return "tablet";
  };
  const windowSizeNamed = getWidthSizeByName(width);

  const slidersRef = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);

  ////logic
  const addSlidersHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    slidersRef.current.push(elementInfo);
  };

  ////animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let aboutDetailsSectionTimeline: gsap.core.Timeline;
      let mm = gsap.matchMedia();

      const aboutDetailsSectionAnimation = (tl: gsap.core.Timeline) => {
        tl.addLabel("start")
          .fromTo(logoRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, "start")
          .fromTo(
            titleRef.current,
            { autoAlpha: 0, x: "100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .fromTo(
            paragraphRef.current,
            { autoAlpha: 0, x: "100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .to(paragraphRef.current, {})
          .addLabel("secondParagraph")
          .fromTo(
            paragraphRef.current,
            { autoAlpha: 1, x: 0 },
            { autoAlpha: 0, x: "-100vw" },
            "secondParagraph"
          )
          .fromTo(
            graphsRef.current,
            { autoAlpha: 0, x: "100vw" },
            {
              autoAlpha: 1,
              x: 0,
            },
            "secondParagraph"
          )
          .add(() => {
            slidersRef.current.forEach((eachSlider, i) => {
              console.log(eachSlider.percentage);
              console.log(eachSlider.percentage / 100);

              return gsap.to(eachSlider.element.current, {
                scaleX: eachSlider.percentage / 100,
                autoAlpha: 1,
              });
            });
          })
          .to(paragraphRef.current, {});
      };

      mm.add("(max-width: 768px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(172, sectionRef);
        aboutDetailsSectionAnimation(aboutDetailsSectionTimeline);
      });

      mm.add("(min-width: 769px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(204, sectionRef);
        aboutDetailsSectionAnimation(aboutDetailsSectionTimeline);
      });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <section title="designerSection">
      <div
        className={`flex flex-col items-center justify-center ${
          isFirstSectionThenNoTopMargin ? "" : "mt-[200%]"
        }`}
        ref={sectionRef}
      >
        <div
          className={`relative ${
            windowSizeNamed === "mobile"
              ? "w-[44px] h-[44px]"
              : "w-[88px] h-[88px]"
          } `}
          ref={logoRef}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
            ref={logoRef}
          >
            <Image src={logoImageURL} alt="logo" width={128} height={128} />
          </div>
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker ${clipPathName}`}
          ></div>
        </div>
        <div className="invisible mt-2 font-style-h3" ref={titleRef}>
          {sectionPurposeName}
        </div>
        <div className="relative w-full md:w-[566px]">
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={paragraphRef}
            >
              <p>{paragraphText}</p>
            </div>
          </div>
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={graphsRef}
            >
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    addSliderElement={addSlidersHandler}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetails;
