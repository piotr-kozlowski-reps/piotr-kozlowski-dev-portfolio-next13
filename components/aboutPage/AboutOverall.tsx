"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDeviceSize from "../../hooks/useDeviceSize";

gsap.registerPlugin(ScrollTrigger);
const AboutOverall = () => {
  ////vars
  const overAllSectionRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRightClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoLeftClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionP1Ref = useRef<HTMLParagraphElement>(null);
  const overAllSectionP2Ref = useRef<HTMLParagraphElement>(null);

  const [width, height, mediaSizeName] = useDeviceSize();

  ////animation
  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    //animation details
    const overAllSectionAnimation = (tl: gsap.core.Timeline) => {
      tl.addLabel("start")
        .to(overAllSectionLogoRef.current, { autoAlpha: 1 }, "start")
        .to(
          overAllSectionLogoLeftClippingMaskRef.current!,
          { autoAlpha: 0 },
          "start"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP1Ref.current!.getElementsByClassName(
              "font-initially-invisible-yellow-p"
            )
          ),
          { autoAlpha: 1 },
          "start"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP1Ref.current!.getElementsByClassName(
              "font-initially-invisible-white-p"
            )
          ),
          { autoAlpha: 1 }
        )
        .addLabel("secondParagraph")
        .to(
          overAllSectionLogoRightClippingMaskRef.current!,
          { autoAlpha: 0 },
          "secondParagraph"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP2Ref.current!.getElementsByClassName(
              "font-initially-invisible-yellow-p"
            )
          ),
          { autoAlpha: 1 },
          "secondParagraph"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP2Ref.current!.getElementsByClassName(
              "font-initially-invisible-white-p"
            )
          ),
          { autoAlpha: 1 }
        )
        .to(overAllSectionRef.current, { autoAlpha: 0, x: "-100%" });
    };

    mm.add("(max-width: 768px)", () => {
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overAllSectionRef.current,
          start: () => `top 172px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      //animation
      overAllSectionAnimation(tl);
    });

    mm.add("(min-width: 769px)", () => {
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overAllSectionRef.current,
          start: () => `top 204px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      //animation
      overAllSectionAnimation(tl);
    });

    //clear and revert
    return () => {
      mm.revert();
    };
  }, []);

  ////jsx
  return (
    <section title="overAll">
      <div
        className={`flex flex-col items-center justify-start ${
          mediaSizeName === "mobile" ? "-mt-[280%]" : "-mt-[140vh]"
        }`}
        ref={overAllSectionRef}
      >
        <div
          className={`relative ${
            mediaSizeName === "mobile"
              ? "w-[44px] h-[44px]"
              : mediaSizeName === "tablet"
              ? "w-[88px] h-[88px]"
              : "w-[128px] h-[128px]"
          } `}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 invisible w-full h-full"
            ref={overAllSectionLogoRef}
          >
            <Image
              src="/logo_only_graph_transparency.png"
              alt="logo"
              width={128}
              height={128}
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
        <div className="mx-8 md:mx-0 w-fill md:w-[566px] pt-[48px] text-center font-style-p ">
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
            <br />
            <span className="font-initially-invisible-white-p">
              Another never read part, with keywords:{" "}
            </span>
            <span className="font-initially-invisible-yellow-p">designer</span>
            <span className="font-initially-invisible-white-p">, </span>
            <span className="font-initially-invisible-yellow-p">reliable </span>
            <span className="font-initially-invisible-white-p">
              ("reliable" is still visible on screen above, so it seems
              redundant!). Have you noticed visual connection with parallel
              appearing "designer" logo part? Appealing? (I'm not convinced,
              ...reconsider...)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutOverall;
