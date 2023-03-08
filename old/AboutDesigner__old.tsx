"use client";

import Image from "next/image";
import React, { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import data from "../data/data.json";
import AboutSlider from "../components/aboutPage/AboutSlider";
import { TSliderData } from "../types/typings";

const AboutDesigner_Old = () => {
  ////vars
  const designerSectionRef = useRef<HTMLDivElement>(null);
  const designerLogoRef = useRef<HTMLDivElement>(null);
  const designerTitleRef = useRef<HTMLDivElement>(null);
  const designerParagraphRef = useRef<HTMLDivElement>(null);
  const designerGraphsRef = useRef<HTMLDivElement>(null);

  const designerSliders: TSliderData[] = data.aboutSlidersDesigner;
  const aboutSlidersDesigner = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);

  ////logic
  const addSlidersDesignerHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    aboutSlidersDesigner.current.push(elementInfo);
  };

  ////animation
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tlDeveloperSection = gsap.timeline({
        scrollTrigger: {
          trigger: designerSectionRef.current,
          start: "top 204px",
          end: "+=450%",
          // markers: true,
          scrub: 0.8,
          pin: true,
        },
      });
      tlDeveloperSection
        .addLabel("start")
        .fromTo(
          designerLogoRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          "start"
        )
        .fromTo(
          designerTitleRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          designerParagraphRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .to(designerParagraphRef.current, {})
        .addLabel("secondParagraph")
        .fromTo(
          designerParagraphRef.current,
          { autoAlpha: 1, x: 0 },
          { autoAlpha: 0, x: "-100vw" },
          "secondParagraph"
        )
        .fromTo(
          designerGraphsRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        .add(() => {
          aboutSlidersDesigner.current.forEach((eachSlider, i) => {
            console.log(eachSlider.percentage);
            console.log(eachSlider.percentage / 100);

            return gsap.to(eachSlider.element.current, {
              scaleX: eachSlider.percentage / 100,
              autoAlpha: 1,
            });
          });
        })
        .to(designerParagraphRef.current, {});
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <section title="designerSection">
      <div
        className="flex flex-col items-center justify-center mt-[200%]"
        ref={designerSectionRef}
      >
        <div className="relative w-[44px] h-[44px]" ref={designerLogoRef}>
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
            ref={designerLogoRef}
          >
            <Image
              src="/logo_only_graph_transparency.png"
              alt="logo"
              width={44}
              height={44}
            />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker clip-path-logo-left-triangle"></div>
        </div>
        <div className="invisible mt-2 font-style-h3" ref={designerTitleRef}>
          designer
        </div>
        <div className="relative w-full">
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={designerParagraphRef}
            >
              <p>
                I'm a passionate Front-End Developer with +6 years of experience
                in developing websites that have a main focus on search
                functionality. I have extensive experience with JavaScript, CSS
                and HTML as well as using libraries and frameworks such as
                jQuery and Bootstrap.
              </p>
            </div>
          </div>
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={designerGraphsRef}
            >
              {designerSliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    isAnimateStripes={true}
                    // addSliderElement={addSlidersDesignerHandler}
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

export default AboutDesigner_Old;
