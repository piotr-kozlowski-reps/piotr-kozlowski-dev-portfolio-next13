"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const AboutOverall = () => {
  ////vars
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
          start: () => "top 204px",
          end: "+=350%",
          // markers: true,
          pin: true,
          scrub: 0.8,
          // pinSpacing: false,
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
        {/* <div className="mx-8 pt-[48px] text-center font-style-p pb-[3000px]"> */}
        <div className="mx-8 pt-[48px] text-center font-style-p">
          <p ref={overAllSectionP1Ref}>
            <span className="font-initially-invisible-white-p">
              Here comes text that is never read by anyone, ever. Main keywords
              I wish to emphasize are:{" "}
            </span>
            <span className="font-initially-invisible-yellow-p">front-end</span>
            <span className="font-initially-invisible-white-p">, </span>
            <span className="font-initially-invisible-yellow-p">developer</span>
            <span className="font-initially-invisible-white-p"> and </span>
            <span className="font-initially-invisible-yellow-p">reliable</span>
            <span className="font-initially-invisible-white-p">.</span>
          </p>
          <p ref={overAllSectionP2Ref}>
            <span className="font-initially-invisible-white-p">
              Another never noticed part, with keywords:{" "}
            </span>
            <span className="font-initially-invisible-yellow-p">designer</span>
            <span className="font-initially-invisible-white-p">, </span>
            <span className="font-initially-invisible-yellow-p">reliable</span>
            <span className="font-initially-invisible-white-p">
              {" "}
              (still visible on screen, so it seems redundant!). Have you seen
              visual connection with parallel appearing "designer" logo part?
              Appealing? (to be considered...)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutOverall;
