"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDeviceSize from "../../hooks/useDeviceSize";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { isFirefox } from "react-device-detect";

gsap.registerPlugin(ScrollTrigger);
const AboutOverall = () => {
  ////vars
  const overAllSectionRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoRightClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionLogoLeftClippingMaskRef = useRef<HTMLDivElement>(null);
  const overAllSectionP1Ref = useRef<HTMLParagraphElement>(null);
  const overAllSectionP2Ref = useRef<HTMLParagraphElement>(null);

  const [_width, _height, mediaSizeName] = useDeviceSize();

  const [classNameForMainWhite, setClassNameForMainWhite] = useState(
    "font-initially-invisible-white-p white-text-part"
  );
  const [classNameForYellow, setClassNameForYellow] = useState(
    "font-initially-invisible-yellow-p yellow-text-part"
  );
  useIsomorphicLayoutEffect(() => {
    if (isFirefox) {
      setClassNameForMainWhite(
        "font-initially-invisible-white-p-firefox md:font-initially-invisible-white-p white-text-part"
      );
      setClassNameForYellow(
        "font-initially-invisible-yellow-p-firefox md:font-initially-invisible-yellow-p yellow-text-part"
      );
    }
  }, []);

  ////animation
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    //animation details
    const overAllSectionAnimation = (tl: gsap.core.Timeline) => {
      tl.addLabel("start")
        .to(overAllSectionRef.current, { autoAlpha: 1 }, "start")
        .to(
          gsap.utils.toArray(
            overAllSectionP1Ref.current.getElementsByClassName(
              "yellow-text-part"
            )
          ),
          { autoAlpha: 1 },
          "start"
        )
        .addLabel("firstSetLogoAndMainText")
        .to(
          overAllSectionLogoLeftClippingMaskRef.current,
          { autoAlpha: 1 },
          "firstSetLogoAndMainText"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP1Ref.current!.getElementsByClassName(
              "white-text-part"
            )
          ),
          { autoAlpha: 1 },
          "firstSetLogoAndMainText"
        )
        .addLabel("secondParagraph")
        .to(
          gsap.utils.toArray(
            overAllSectionP2Ref.current!.getElementsByClassName(
              "yellow-text-part"
            )
          ),
          { autoAlpha: 1 },
          "secondParagraph"
        )
        .addLabel("secondSetLogoAndMainText")
        .to(
          overAllSectionLogoRightClippingMaskRef.current!,
          { autoAlpha: 1 },
          "secondSetLogoAndMainText"
        )
        .to(
          gsap.utils.toArray(
            overAllSectionP2Ref.current!.getElementsByClassName(
              "white-text-part"
            )
          ),
          { autoAlpha: 1 },
          "secondSetLogoAndMainText"
        )
        .to(overAllSectionRef.current, { autoAlpha: 0, x: "-100%" });
    };

    mm.add("(max-width: 768px)", () => {
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overAllSectionRef.current,
          // start: () => `top 172px`,
          start: () => `top 132px`,
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
        className={`flex flex-col items-center justify-start invisible ${
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
            className="absolute top-0 bottom-0 left-0 right-0 invisible w-full h-full"
            ref={overAllSectionLogoLeftClippingMaskRef}
          >
            <Image
              src="/logo_only_graph_transparency__developer.png"
              alt="logo"
              width={128}
              height={128}
            />
          </div>
          <div
            className="absolute top-0 bottom-0 left-0 right-0 invisible w-full h-full"
            ref={overAllSectionLogoRightClippingMaskRef}
          >
            <Image
              src="/logo_only_graph_transparency__designer.png"
              alt="logo"
              width={128}
              height={128}
            />
          </div>
        </div>
        <div className="mx-8 md:mx-0 w-fill md:w-[566px] pt-[22px] md:pt-[48px] text-center font-style-p ">
          <p ref={overAllSectionP1Ref}>
            <span className={classNameForMainWhite}>
              Here comes text that is never read by anyone, ever. Main keywords
              I wish to emphasize are:{" "}
            </span>
            <span className={classNameForYellow}>front-end</span>
            <span className={classNameForMainWhite}>, </span>
            <span className={classNameForYellow}>developer</span>
            <span className={classNameForMainWhite}> and </span>
            <span className={classNameForYellow}>reliable</span>
            <span className={classNameForMainWhite}>.</span>
          </p>
          <p ref={overAllSectionP2Ref} className="-mt-[19px] md:mt-0">
            <br />
            <span className={classNameForMainWhite}>
              Another never read part, with keywords:{" "}
            </span>
            <span className={classNameForYellow}>designer</span>
            <span className={classNameForMainWhite}>, </span>
            <span className={classNameForYellow}>reliable </span>
            <span className={classNameForMainWhite}>
              (&quot;reliable&quot; is still visible on screen above, so it
              seems redundant!). Have you noticed visual connection with
              parallel appearing &quot;designer&quot; logo part? Appealing?
              (I&apos;m not convinced, ...reconsider!)
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutOverall;
