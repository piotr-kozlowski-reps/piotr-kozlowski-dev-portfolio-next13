"use client";

import Image from "next/image";
import React, { Fragment, useRef } from "react";
import gsap from "gsap";
import AboutSlider from "../components/aboutPage/AboutSlider";
import { TDetailsInfoSet } from "../types/typings";
import { generatePropertiesForTimelineInEveryResolution } from "../utils/animations";
import useDeviceSize from "../hooks/useDeviceSize";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

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

  const sectionDesktopRef = useRef<HTMLDivElement>(null);
  const logoDesktopRef = useRef<HTMLDivElement>(null);
  const titleDesktopRef = useRef<HTMLDivElement>(null);
  const paragraphDesktopRef = useRef<HTMLDivElement>(null);
  const graphsDesktopRef = useRef<HTMLDivElement>(null);

  const [width, height, mediaSizeName] = useDeviceSize();

  const slidersNonDesktopRef = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);
  const slidersDesktopRef = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);

  ////logic
  const addSlidersNonDesktopHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    slidersNonDesktopRef.current.push(elementInfo);
  };
  const addSlidersDesktopHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    slidersDesktopRef.current.push(elementInfo);
  };

  ////animation
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let aboutDetailsSectionTimeline: gsap.core.Timeline;
      let mm = gsap.matchMedia();

      const aboutDetailsSectionNonDesktopAnimation = (
        tl: gsap.core.Timeline
      ) => {
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
            slidersNonDesktopRef.current.forEach((eachSlider, i) => {
              return gsap.to(eachSlider.element.current, {
                scaleX: eachSlider.percentage / 100,
                autoAlpha: 1,
              });
            });
          })
          .to(paragraphRef.current, {});
      };

      const aboutDetailsSectionDesktopAnimation = (tl: gsap.core.Timeline) => {
        tl.addLabel("start")
          .fromTo(
            logoDesktopRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1 },
            "start"
          )
          .fromTo(
            titleDesktopRef.current,
            { autoAlpha: 0, x: "100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .fromTo(
            paragraphDesktopRef.current,
            { autoAlpha: 0, x: "100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .to(paragraphDesktopRef.current, {});
        // .addLabel("secondParagraph")
        // .fromTo(
        //   paragraphRef.current,
        //   { autoAlpha: 1, x: 0 },
        //   { autoAlpha: 0, x: "-100vw" },
        //   "secondParagraph"
        // )
        // .fromTo(
        //   graphsRef.current,
        //   { autoAlpha: 0, x: "100vw" },
        //   {
        //     autoAlpha: 1,
        //     x: 0,
        //   },
        //   "secondParagraph"
        // )
        // .add(() => {
        //   slidersNonDesktopRef.current.forEach((eachSlider, i) => {
        //     return gsap.to(eachSlider.element.current, {
        //       scaleX: eachSlider.percentage / 100,
        //       autoAlpha: 1,
        //     });
        //   });
        // })
        // .to(paragraphRef.current, {});
      };

      mm.add("(max-width: 768px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(172, sectionRef);
        aboutDetailsSectionNonDesktopAnimation(aboutDetailsSectionTimeline);
      });

      mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(204, sectionRef);
        aboutDetailsSectionNonDesktopAnimation(aboutDetailsSectionTimeline);
      });

      mm.add("(min-width: 1224px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(
            204,
            sectionDesktopRef
          );
        aboutDetailsSectionDesktopAnimation(aboutDetailsSectionTimeline);
      });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  const mobileAndTabletJSX = (
    <section title="aboutDetailsSection">
      <div
        className={`flex flex-col items-center justify-center ${
          isFirstSectionThenNoTopMargin ? "" : "mt-[200%]"
        }`}
        ref={sectionRef}
      >
        <div
          className={`relative ${
            mediaSizeName === "mobile"
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
                    isAnimateStripes={true}
                    // addSliderElement={addSlidersNonDesktopHandler}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const desktopJSX = (
    <section title="aboutDetailsSection">
      <div className="flex items-start justify-between xl:w-[1220px] xl:mx-auto z-10">
        <div
          className={`flex flex-col items-start justify-start ml-8 w-[570px] ${
            isFirstSectionThenNoTopMargin ? "" : "mt-[200%]"
          }`}
          ref={sectionDesktopRef}
        >
          <div className={`relative w-[44px] h-[44px]`} ref={logoDesktopRef}>
            <div
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
              ref={logoDesktopRef}
            >
              <Image src={logoImageURL} alt="logo" width={128} height={128} />
            </div>
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker ${clipPathName}`}
            ></div>
          </div>
          {/* <div className="invisible mt-2 font-style-h3" ref={titleRef}> */}
          <div className="mt-2 font-style-h3" ref={titleDesktopRef}>
            {sectionPurposeName}
          </div>
          <div className="relative w-full ">
            <div className="absolute w-full h-full">
              <div
                // className="mx-8 pt-[48px] text-center font-style-p invisible"
                className="pt-[48px] font-style-p"
                ref={paragraphDesktopRef}
              >
                <p>{paragraphText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[74px]"></div>
        <div className="w-[468px] mr-[28px]">
          <div className="h-fill w-fill mt-[134px]">
            <div className="invisible font-style-p" ref={graphsDesktopRef}>
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    // addSliderElement={addSlidersDesktopHandler}
                    mediaSizeName={mediaSizeName}
                    isAnimateStripes={true}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return mediaSizeName !== "desktop" ? mobileAndTabletJSX : desktopJSX;
};

export default AboutDetails;
