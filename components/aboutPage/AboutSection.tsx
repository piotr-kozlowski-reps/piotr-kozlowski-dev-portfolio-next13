"use client";

import gsap from "gsap";
import React, { Fragment, useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AboutTitle from "./AboutTitle";

type Props = {
  tl: gsap.core.Timeline;
  sectionsBeforePercentage: number;
};

gsap.registerPlugin(ScrollTrigger);
const AboutSection = (props: Props) => {
  ////vars
  const { tl, sectionsBeforePercentage } = props;

  //overall section
  const overAllSectionRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRightClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoLeftClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionP1Ref = useRef<HTMLParagraphElement>(null);
  const overAllSectionP2Ref = useRef<HTMLParagraphElement>(null);

  ////animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /** overall section animation */
      const tlOverAllSection = gsap.timeline({
        scrollTrigger: {
          trigger: overAllSectionRef.current,
          start: "top 204px",
          end: "bottom 204px",
          markers: true,
          pin: true,
          scrub: 0.8,
        },
      });

      const whiteTextFirstParagraph =
        overAllSectionP1Ref.current!.getElementsByClassName(
          "font-initially-invisible-white-p"
        );
      const yellowTextFirstParagraph =
        overAllSectionP1Ref.current!.getElementsByClassName(
          "font-initially-invisible-yellow-p"
        );
      const whiteTextSecondParagraph =
        overAllSectionP2Ref.current!.getElementsByClassName(
          "font-initially-invisible-white-p"
        );
      const yellowTextSecondParagraph =
        overAllSectionP2Ref.current!.getElementsByClassName(
          "font-initially-invisible-yellow-p"
        );

      tlOverAllSection
        .addLabel("start")
        .to(overAllSectionLogoRef.current, { autoAlpha: 1 }, "start")
        .to(
          overAllSectionLogoLeftClippingMaskRef.current!,
          { autoAlpha: 0 },
          "start"
        )
        .to(yellowTextFirstParagraph, { autoAlpha: 1 }, "start")
        .to(whiteTextFirstParagraph, { autoAlpha: 1 })
        .addLabel("secondParagraph")
        .to(
          overAllSectionLogoRightClippingMaskRef.current!,
          { autoAlpha: 0 },
          "secondParagraph"
        )
        .to(yellowTextSecondParagraph, { autoAlpha: 1 }, "secondParagraph")
        .to(whiteTextSecondParagraph, { autoAlpha: 1 })
        .to(overAllSectionRef.current, { autoAlpha: 0, x: "-100%" });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <Fragment>
      <AboutTitle />

      <section title="overAll">
        <div
          className="flex flex-col items-center justify-center -mt-[280%]"
          ref={overAllSectionRef}
        >
          <div className="relative w-[44px] h-[44px]">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 invisible w-full h-full"
              ref={overAllSectionLogoRef}
            >
              <Image
                src="/logo_only_graph_transparency.png"
                alt="logo"
                width={44}
                height={44}
              />
            </div>
            <div
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker clip-path-logo-left-triangle"
              ref={overAllSectionLogoLeftClippingMaskRef}
            ></div>
            <div
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker clip-path-logo-right-triangle"
              ref={overAllSectionLogoRightClippingMaskRef}
            ></div>
          </div>
          <div className="mx-8 pt-[48px] text-center font-style-p pb-[3000px]">
            <p ref={overAllSectionP1Ref}>
              <span className="font-initially-invisible-white-p">
                I'm a passionate{" "}
              </span>
              <span className="font-initially-invisible-yellow-p">
                Front-End Developer{" "}
              </span>
              <span className="font-initially-invisible-white-p">
                with +6 years of experience in developing websites that have a
                main focus on search functionality.
              </span>
            </p>
            <p ref={overAllSectionP2Ref}>
              <span className="font-initially-invisible-white-p">I have</span>
              <span className="font-initially-invisible-yellow-p">
                {" "}
                extensive experience{" "}
              </span>
              <span className="font-initially-invisible-white-p">
                with JavaScript, CSS and HTML as well as using libraries and
                frameworks such as
              </span>
              <span className="font-initially-invisible-yellow-p">
                {" "}
                jQuery and Bootstrap.
              </span>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutSection;
