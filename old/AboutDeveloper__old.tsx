"use client";

import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../data/data.json";
import AboutSlider from "./AboutSlider";
import { TSliderData } from "../../types/typings";

gsap.registerPlugin(ScrollTrigger);
const AboutDeveloper = () => {
  ////vars
  const developerSectionRef = useRef<HTMLDivElement>(null);
  const developerLogoRef = useRef<HTMLDivElement>(null);
  const developerTitleRef = useRef<HTMLDivElement>(null);
  const developerParagraphRef = useRef<HTMLDivElement>(null);
  const developerGraphsRef = useRef<HTMLDivElement>(null);

  const developerSliders: TSliderData[] = data.aboutSlidersDeveloper;
  const slidersDeveloper = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);

  ////logic
  const addSlidersDeveloperHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    slidersDeveloper.current.push(elementInfo);
  };

  ////animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tlDeveloperSection = gsap.timeline({
        scrollTrigger: {
          trigger: developerSectionRef.current,
          start: "top 204px",
          end: "+=450%",
          // markers: true,
          scrub: 0.8,
          pin: true,
        },
      });

      const slidersAnimation = () =>
        slidersDeveloper.current.forEach((el, i) => {
          return gsap.to(el.element.current, {
            scaleX: 0.5,
            transformOrigin: "top left",
            ease: "power4.inOut",
            scrollTrigger: {
              scrub: 0.8,
            },
          });
        });

      tlDeveloperSection
        .addLabel("start")
        .fromTo(
          developerLogoRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          developerTitleRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          developerParagraphRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .to(developerParagraphRef.current, {})
        .addLabel("secondParagraph")
        .fromTo(
          developerParagraphRef.current,
          { autoAlpha: 1, x: 0 },
          { autoAlpha: 0, x: "-100vw" },
          "secondParagraph"
        )
        .fromTo(
          developerGraphsRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        .add(() => {
          slidersDeveloper.current.forEach((eachSlider, i) => {
            console.log(eachSlider.percentage);
            console.log(eachSlider.percentage / 100);

            return gsap.to(eachSlider.element.current, {
              scaleX: eachSlider.percentage / 100,
              autoAlpha: 1,
            });
          });
        })
        .to(developerParagraphRef.current, {});
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <section title="developerSection">
      <div
        className="flex flex-col items-center justify-center -mt-[200%]"
        ref={developerSectionRef}
      >
        <div
          className="relative w-[44px] h-[44px] invisible"
          ref={developerLogoRef}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
            ref={developerLogoRef}
          >
            <Image
              src="/logo_only_graph_transparency.png"
              alt="logo"
              width={44}
              height={44}
            />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker clip-path-logo-right-triangle"></div>
        </div>
        <div className="invisible mt-2 font-style-h3" ref={developerTitleRef}>
          developer
        </div>
        <div className="relative w-full">
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={developerParagraphRef}
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
              ref={developerGraphsRef}
            >
              {developerSliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    addSliderElement={addSlidersDeveloperHandler}
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

export default AboutDeveloper;
