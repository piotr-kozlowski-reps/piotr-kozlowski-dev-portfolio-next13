"use client";

import React, { Fragment, useRef, useState } from "react";
import gsap from "gsap";

import { TDetailsInfoSet } from "../../types/typings";
import useDeviceSize from "../../hooks/useDeviceSize";
import Image from "next/image";
import AboutSlider from "./AboutSlider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import clsx from "clsx";
import { isFirefox } from "react-device-detect";

type Props = {
  detailsInfoSet: TDetailsInfoSet;
};

gsap.registerPlugin(ScrollTrigger);
const AboutDetails = (props: Props) => {
  ////vars
  const {
    isFirstSectionThenNoTopMargin,
    logoImageURL,
    sectionPurposeName,
    paragraphText,
    sliders,
  } = props.detailsInfoSet;

  const [isAnimateStripes, setIsAnimateStripes] = useState(false);

  const [width, _height, mediaSizeName] = useDeviceSize();

  const sectionDesktopRef = useRef<HTMLDivElement>(null);
  const sectionModalRef = useRef<HTMLDivElement>(null);
  const logoMobileAndTabletRef = useRef<HTMLDivElement>(null);
  const logoDesktopRef = useRef<HTMLDivElement>(null);
  const titleMobileAndTabletRef = useRef<HTMLDivElement>(null);
  const titleDesktopRef = useRef<HTMLDivElement>(null);
  const paragraphMobileAndTabletRef = useRef<HTMLDivElement>(null);
  const paragraphDesktopRef = useRef<HTMLDivElement>(null);
  const graphsMobileAndTabletRef = useRef<HTMLDivElement>(null);
  const graphsDesktopRef = useRef<HTMLDivElement>(null);

  const [classesWhenFirefox, setClassesWhenFirefox] = useState(
    "mx-8 pt-[39px] text-center font-style-p invisible"
  );
  useIsomorphicLayoutEffect(() => {
    if (isFirefox) {
      setClassesWhenFirefox(
        "mx-8 pt-[39px] text-center md:font-style-p invisible font-style-p-firefox"
      );
    }
  }, []);

  ////animation
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    function createTl(
      ref: React.RefObject<HTMLDivElement>,
      yFromTopInPixels: number,
      endPercentage: number
    ) {
      return gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: () => `top ${yFromTopInPixels}px`,
          end: () => `+=${endPercentage}%`,
          // markers: true,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }

    function animateMobileAndTablet(tl: gsap.core.Timeline) {
      tl.addLabel("start")
        .call(() => {
          setIsAnimateStripes(false);
        })
        .fromTo(
          logoMobileAndTabletRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          "start"
        )
        .fromTo(
          titleMobileAndTabletRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          paragraphMobileAndTabletRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .to(paragraphMobileAndTabletRef.current, {})
        .addLabel("secondParagraph")
        .fromTo(
          paragraphMobileAndTabletRef.current,
          { autoAlpha: 1, x: 0 },
          { autoAlpha: 0, x: "-100vw" },
          "secondParagraph"
        )
        .fromTo(
          graphsMobileAndTabletRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        .call(() => {
          setIsAnimateStripes(true);
        })
        .to(paragraphMobileAndTabletRef.current, {})
        .addLabel("fadeOut")
        .to(
          graphsMobileAndTabletRef.current,
          { autoAlpha: 0, y: "-100vw" },
          "fadeOut"
        )
        .to(
          titleMobileAndTabletRef.current,
          { autoAlpha: 0, y: "-100vw" },
          "fadeOut"
        )
        .to(
          logoMobileAndTabletRef.current,
          { autoAlpha: 0, y: "-100vw" },
          "fadeOut"
        )
        .to(paragraphMobileAndTabletRef.current, {});
    }

    mm.add("(max-width: 768px)", () => {
      const tl = createTl(sectionModalRef, 132, 450);
      animateMobileAndTablet(tl);
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      const tl = createTl(sectionModalRef, 204, 500);
      animateMobileAndTablet(tl);
    });

    mm.add("(min-width: 1224px)", () => {
      //tl
      const tl = createTl(sectionDesktopRef, 204, 350);

      tl.addLabel("start")
        .call(() => {
          setIsAnimateStripes(false);
        })
        .fromTo(
          logoDesktopRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          "start"
        )
        .fromTo(
          titleDesktopRef.current,
          { autoAlpha: 0, x: "-100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          paragraphDesktopRef.current,
          { autoAlpha: 0, x: "-100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .call(() => {
          setIsAnimateStripes(true);
        })
        .addLabel("secondParagraph")
        .fromTo(
          graphsDesktopRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        .to(paragraphDesktopRef.current, {});
    });

    return () => mm.revert();
  }, []);

  ////jsx
  return (
    <section title="aboutDetailsSection">
      {/* {width < 1224  -> start */}
      <div
        className={clsx(
          `flex flex-col xl:flex-row items-center xl:items-start justify-center xl:justify-between w-full xl:w-container mx-0 xl:mx-auto z-10 pb-0 xl:pb-8 bg-background_2_darker`,
          { "mt-[100%]": !isFirstSectionThenNoTopMargin },
          { invisible: width >= 1224 }
        )}
        ref={sectionModalRef}
        data-testid="about-overall-text-developer"
      >
        <div
          className={`relative  ${
            mediaSizeName === "mobile"
              ? "w-[44px] h-[44px]"
              : "w-[88px] h-[88px]"
          } `}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
            ref={logoMobileAndTabletRef}
          >
            <Image src={logoImageURL} alt="logo" width={128} height={128} />
          </div>
        </div>
        <div
          className="invisible mt-[7px] font-style-h3 "
          ref={titleMobileAndTabletRef}
        >
          {sectionPurposeName}
        </div>
        <div className="relative w-full md:w-[566px] ">
          <div className="absolute w-full h-full ">
            <div
              className={classesWhenFirefox}
              ref={paragraphMobileAndTabletRef}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: paragraphText,
                }}
              ></div>
            </div>
          </div>
          <div className="absolute w-full h-full ">
            <div
              className="mx-8 pt-[41px] text-center font-style-p invisible"
              ref={graphsMobileAndTabletRef}
            >
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    isAnimateStripes={isAnimateStripes}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {width < 1224  -> end */}

      {/* {width >= 1224  -> start */}
      <div
        className={clsx(
          `flex flex-col xl:flex-row items-center xl:items-start justify-center xl:justify-between w-full xl:w-container mx-0 xl:mx-auto z-10 pb-0 xl:pb-8 bg-background_2_darker)`,
          // { "mt-[50%]": !isFirstSectionThenNoTopMargin },
          { invisible: width < 1224 }
        )}
        ref={sectionDesktopRef}
        data-testid="about-overall-text-developer"
      >
        <div
          className={`flex flex-col items-start justify-start ml-[40px] w-[570px]`}
        >
          <div className="relative w-[44px] h-[44px]" ref={logoDesktopRef}>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-fill h-fill">
              <Image src={logoImageURL} alt="logo" width={128} height={128} />
            </div>
          </div>
          <div className="mt-2 font-style-h3" ref={titleDesktopRef}>
            {sectionPurposeName}
          </div>
          <div className="relative w-full ">
            <div className="absolute w-full h-full">
              <div className="pt-[48px] font-style-p" ref={paragraphDesktopRef}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: paragraphText,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[570px] mr-[23px]">
          <div className="h-fill w-fill mt-[134px]">
            <div className="font-style-p" ref={graphsDesktopRef}>
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    mediaSizeName={mediaSizeName}
                    isAnimateStripes={isAnimateStripes}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {width >= 1224  -> end */}
    </section>
  );
};

export default AboutDetails;
