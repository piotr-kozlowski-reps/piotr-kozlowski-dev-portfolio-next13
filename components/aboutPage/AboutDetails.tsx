import React, { Fragment, RefObject, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { TDetailsInfoSet } from "../../types/typings";
import useDeviceSize from "../../hooks/useDeviceSize";
import Image from "next/image";
import AboutSlider from "./AboutSlider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  detailsInfoSet: TDetailsInfoSet;
};

gsap.registerPlugin(ScrollTrigger);
const AboutDetails = (props: Props) => {
  ////vars
  const { detailsInfoSet } = props;
  const {
    isFirstSectionThenNoTopMargin,
    logoImageURL,
    clipPathName,
    sectionPurposeName,
    paragraphText,
    sliders,
  } = props.detailsInfoSet;

  const [width, height, mediaSizeName] = useDeviceSize();

  // const sectionMobileAndTabletRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const graphsRef = useRef<HTMLDivElement>(null);

  ////animation
  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      console.log("(max-width: 768px)");
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top 172px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

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
        .to(paragraphRef.current, {})
        .addLabel("fadeOut")
        .to(graphsRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(titleRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(logoRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut");
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      console.log("(min-width: 769px) and (max-width: 1223px)");
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top 204px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

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
        .to(paragraphRef.current, {})
        .addLabel("fadeOut")
        .to(graphsRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(titleRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(logoRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut");
    });

    mm.add("(min-width: 1224px)", () => {
      console.log("(min-width: 1224px)");
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: () => `top 204px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.addLabel("start")
        .fromTo(logoRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, "start")
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, x: "-100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          paragraphRef.current,
          { autoAlpha: 0, x: "-100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .addLabel("secondParagraph")
        .fromTo(
          graphsRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        .to(paragraphRef.current, {});
    });

    return () => mm.revert();
  }, []);

  ////jsx
  const mobileAndTabletJSX = (
    <section title="aboutDetailsSection">
      <div
        className={`flex flex-col items-center justify-center  ${
          isFirstSectionThenNoTopMargin ? "" : "mt-[100%]"
        }`}
        ref={sectionRef}
      >
        <div
          className={`relative  ${
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
        <div className="invisible mt-2 font-style-h3 " ref={titleRef}>
          {sectionPurposeName}
        </div>
        <div className="relative w-full md:w-[566px] ">
          <div className="absolute w-full h-full ">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={paragraphRef}
            >
              <p>{paragraphText}</p>
            </div>
          </div>
          <div className="absolute w-full h-full ">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={graphsRef}
            >
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    // addSliderElement={addSlidersHandler}
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
      <div
        className="flex items-start justify-between xl:w-[1220px] xl:mx-auto z-10 pb-8 bg-background_2_darker"
        ref={sectionRef}
      >
        <div
          className={`flex flex-col items-start justify-start ml-[40px] w-[570px]`}
        >
          <div className="relative w-[44px] h-[44px]" ref={logoRef}>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-fill h-fill">
              <Image src={logoImageURL} alt="logo" width={128} height={128} />
            </div>
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 w-fill h-fill bg-background_2_darker ${clipPathName}`}
            ></div>
          </div>
          <div className="mt-2 font-style-h3" ref={titleRef}>
            {sectionPurposeName}
          </div>
          <div className="relative w-full ">
            <div className="absolute w-full h-full">
              <div className="pt-[48px] font-style-p" ref={paragraphRef}>
                <p>{paragraphText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[570px] mr-[23px]">
          <div className="h-fill w-fill mt-[134px]">
            <div className="font-style-p" ref={graphsRef}>
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    // addSliderElement={addSlidersHandler}
                    mediaSizeName={mediaSizeName}
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
