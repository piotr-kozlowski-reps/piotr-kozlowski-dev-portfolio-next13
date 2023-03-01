import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";

import CredentialItem from "./CredentialItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../data/data.json";
import { animated, useSpring } from "@react-spring/web";

gsap.registerPlugin(ScrollTrigger);
const AboutCredentials = () => {
  ////vars
  const { credentialItems } = data;
  const credentialItemsSectionRef = useRef<HTMLDivElement>(null);
  //refs
  const credentialItemRef = useRef<HTMLDivElement>(null);
  const credentialTopBackgroundRef = useRef<HTMLDivElement>(null);
  //refs portraits
  const credentialPortrait0Ref = useRef<HTMLDivElement>(null);
  const credentialPortrait1Ref = useRef<HTMLDivElement>(null);
  const credentialPortrait2Ref = useRef<HTMLDivElement>(null);
  const credentialPortrait3Ref = useRef<HTMLDivElement>(null);
  //refs paragraphs
  const credentialParagraphBackgroundDivRef = useRef<HTMLDivElement>(null);
  const credentialParagraph0Ref = useRef<HTMLDivElement>(null);
  const credentialParagraph1Ref = useRef<HTMLDivElement>(null);
  const credentialParagraph2Ref = useRef<HTMLDivElement>(null);
  const credentialParagraph3Ref = useRef<HTMLDivElement>(null);

  ////SVG animation settings
  const topBackgroundsFill = [
    "M215 45.4346L360 0V60H0V11.3586L215 45.4346Z",
    "M89 0L360 50V60H0V40.5L89 0Z",
  ];
  const topBackgroundsLine = [
    "M215 45.125L107.5 28.0625L0 11",
    "M360 50L203 21L89 0.5",
  ];
  const indexOfVisibleParagraph = [0, 1];
  // const [activeSVGIndex, setActiveSVGIndex] = useState(0);
  // const animationProps = useSpring({
  //   topBackgroundsFill: topBackgroundsFill[activeSVGIndex],
  //   topBackgroundsLine: topBackgroundsLine[activeSVGIndex],
  // });

  const [topSVGanimationProps, apiTopSVGanimationProps] = useSpring(() => ({
    topBackgroundsFill: topBackgroundsFill[0],
    topBackgroundsLine: topBackgroundsLine[0],
    indexOfVisibleParagraph: indexOfVisibleParagraph[0],
  }));

  function credentialsTransition(toIndex: number) {
    apiTopSVGanimationProps.start({
      topBackgroundsFill: topBackgroundsFill[toIndex],
      topBackgroundsLine: topBackgroundsLine[toIndex],
      indexOfVisibleParagraph: indexOfVisibleParagraph[toIndex],
    });
  }

  function credential1Animation() {
    let tl = gsap.timeline();
    tl.addLabel("start")
      .fromTo(
        credentialItemRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "start"
      )
      .fromTo(
        credentialPortrait0Ref.current,
        { scale: 0 },
        { scale: 1 },
        "start"
      )
      .to(
        credentialParagraphBackgroundDivRef.current,
        { autoAlpha: 1 },
        "start"
      )
      .to(credentialParagraph0Ref.current, { autoAlpha: 1 }, "start");
    return tl;
  }

  function credentialTimeToWaitAnimation() {
    let tl = gsap.timeline();
    tl.to(credentialItemRef.current, {});
    return tl;
  }

  function credentialParagraphTransitionAnimation(
    divBackgroundRef: React.RefObject<HTMLDivElement>,
    prevParagraphRef: React.RefObject<HTMLDivElement>,
    nextParagraphRef: React.RefObject<HTMLDivElement>
  ) {
    let tl = gsap.timeline();
    tl.fromTo(
      prevParagraphRef.current,
      { autoAlpha: 1 },
      { autoAlpha: 0 },
      "start"
    )
      .to(prevParagraphRef.current, {
        visibility: "hidden",
        immediateRender: false,
      })
      .to(nextParagraphRef.current, {
        visibility: "visible",
        immediateRender: false,
      })
      .fromTo(nextParagraphRef.current, { autoAlpha: 1 }, { autoAlpha: 0 });
    return tl;
  }

  function credential2Animation() {
    let tl = gsap.timeline();
    return tl;
  }

  ////animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      const credentialTl = gsap.timeline({
        scrollTrigger: {
          trigger: credentialItemsSectionRef.current,
          start: "center center",
          end: () => "+=" + credentialItemsSectionRef.current!.offsetHeight * 2,
          // toggleActions: "play complete reverse resume",
          markers: true,
          pin: true,
          scrub: 0.8,
        },
      });

      credentialTl
        .addLabel("start")
        .add(credential1Animation())
        .add(credentialTimeToWaitAnimation())
        .add(
          credentialParagraphTransitionAnimation(
            credentialParagraphBackgroundDivRef,
            credentialParagraph0Ref,
            credentialParagraph1Ref
          )
        )
        .add(credentialTimeToWaitAnimation())
        .to(credentialItemRef.current, { autoAlpha: 0 });
      // .call(() => credentialsTransition(0))
      // .add(credential1Animation())
      // .call(() => credentialsTransition(1))
      // .add(credential2Animation());
    });
    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <div className="relative w-screen h-screen" ref={credentialItemsSectionRef}>
      {/* credential[0] - start */}
      <div
        ref={credentialItemRef}
        className="absolute top-0 left-0 invisible w-full h-full"
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-[60px] w-full">
              <div
                className="absolute top-0 left-0 w-full h-full"
                ref={credentialTopBackgroundRef}
              >
                <svg
                  width="100%"
                  height="60px"
                  viewBox="0 0 360 60"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <animated.path
                    d={topSVGanimationProps.topBackgroundsFill}
                    fill="#2C2F36"
                  />
                  <animated.path
                    d={topSVGanimationProps.topBackgroundsLine}
                    stroke="#FCEB41"
                  />
                </svg>
              </div>

              {/* portrait0 - start */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                ref={credentialPortrait0Ref}
              >
                <div className="w-[44px] h-[44px] mx-auto">
                  <Image
                    src={credentialItems[0].portraitImgUrl}
                    height={128}
                    width={128}
                    alt="credentials portrait"
                  />
                </div>
              </div>
              {/* portrait0 - end */}
              {/* portrait1 - start */}
              <div
                className="absolute top-0 left-0 invisible w-full h-full"
                ref={credentialPortrait1Ref}
              >
                <div className="w-[44px] h-[44px] mx-auto">
                  <Image
                    src={credentialItems[1].portraitImgUrl}
                    height={128}
                    width={128}
                    alt="credentials portrait"
                  />
                </div>
              </div>
              {/* portrait1 - end */}
              {/* portrait2 - start */}
              <div
                className="absolute top-0 left-0 invisible w-full h-full"
                ref={credentialPortrait2Ref}
              >
                <div className="w-[44px] h-[44px] mx-auto">
                  <Image
                    src={credentialItems[2].portraitImgUrl}
                    height={128}
                    width={128}
                    alt="credentials portrait"
                  />
                </div>
              </div>
              {/* portrait2 - end */}
              {/* portrait3 - start */}
              <div
                className="absolute top-0 left-0 invisible w-full h-full"
                ref={credentialPortrait3Ref}
              >
                <div className="w-[44px] h-[44px] mx-auto">
                  <Image
                    src={credentialItems[3].portraitImgUrl}
                    height={128}
                    width={128}
                    alt="credentials portrait"
                  />
                </div>
              </div>
              {/* portrait3 - end */}
            </div>

            {/* paragraph0 - start */}
            {/* <div
              className="invisible bg-background_1_lighter"
              ref={credentialParagraphBackgroundDiv0Ref}
            >
              <p
                className="mx-8 text-center font-style-sm"
                ref={credentialParagraph0Ref}
              >
                {credentialItems[0].credentialText}
              </p>
            </div> */}
            {/* paragraph0 - end */}
            {/* paragraph1 - start */}
            {/* <div
              className="hidden bg-background_1_lighter"
              ref={credentialParagraphBackgroundDiv1Ref}
            >
              <p
                className="mx-8 text-center font-style-sm"
                ref={credentialParagraph1Ref}
              >
                {credentialItems[1].credentialText}
              </p>
            </div> */}
            {/* paragraph1 - end */}
            {/* paragraph2 - start */}
            {/* <div
              className="hidden bg-background_1_lighter"
              ref={credentialParagraphBackgroundDiv2Ref}
            >
              <p
                className="mx-8 text-center font-style-sm"
                ref={credentialParagraph2Ref}
              >
                {credentialItems[2].credentialText}
              </p>
            </div> */}
            {/* paragraph2 - end */}
            {/* paragraph3 - start */}
            {/* <div
              className="hidden bg-background_1_lighter"
              ref={credentialParagraph3Ref}
            >
              <p className="mx-8 text-center font-style-sm">
                {credentialItems[3].credentialText}
              </p>
            </div> */}
            {/* paragraph3 - end */}

            {/* paragraphs - start */}
            <div
              className="relative invisible bg-background_1_lighter"
              ref={credentialParagraphBackgroundDivRef}
            >
              {/* paragraph0 - start */}
              <p
                className="mx-8 text-center font-style-sm"
                ref={credentialParagraph0Ref}
              >
                {credentialItems[0].credentialText}
              </p>
              {/* paragraph0 - end */}
              {/* paragraph1 - start */}
              <p
                className="hidden mx-8 text-center font-style-sm"
                ref={credentialParagraph1Ref}
              >
                {credentialItems[1].credentialText}
              </p>
              {/* paragraph1 - end */}
              {/* paragraph2 - start */}
              <p
                className="hidden mx-8 text-center font-style-sm"
                ref={credentialParagraph2Ref}
              >
                {credentialItems[2].credentialText}
              </p>
              {/* paragraph2 - end */}
              {/* paragraph3 - start */}
              <p
                className="hidden mx-8 text-center font-style-sm"
                ref={credentialParagraph3Ref}
              >
                {credentialItems[3].credentialText}
              </p>
              {/* paragraph3 - end */}
            </div>
            {/* paragraphs - end */}

            <div className="relative h-[88px] w-full ">
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={credentialItems[0].backgroundBottomImgUrl}
                  width={360}
                  height={88}
                  alt="credentials bottom background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* credential[0] - end */}

      {/* credential[1] - start */}
      {/* <div
        ref={credentialItem2Ref}
        className="absolute top-0 left-0 invisible w-full h-full"
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-[60px] w-full">
              <div
                className="absolute bottom-0 w-full h-full"
                ref={credentialTopBackground2Ref}
              >
                <Image
                  src={credentialItems[1].backgroundTopImgUrl}
                  width={360}
                  height={60}
                  alt="credentials top background"
                  className="absolute bottom-0 w-full h-full"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 w-full h-full"
                ref={credentialTopLine2Ref}
              >

                <Image
                  src={credentialItems[1].backgroundTopLineImgUrl}
                  width={360}
                  height={60}
                  alt="credentials line"
                  // className="absolute bottom-0 right-0 w-full h-full"
                />
              </div>

              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-[44px] h-[44px] mx-auto">
                  <Image
                    src={credentialItems[1].portraitImgUrl}
                    height={128}
                    width={128}
                    alt="credentials portrait"
                  />
                </div>
              </div>
            </div>
            <div className="bg-background_1_lighter">
              <p className="mx-8 text-center font-style-sm">
                {credentialItems[1].credentialText}
              </p>
            </div>
            <div className="relative h-[88px] w-full ">
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  src={credentialItems[1].backgroundBottomImgUrl}
                  width={360}
                  height={88}
                  alt="credentials bottom background"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* credential[1] - end */}
    </div>
  );
};

export default AboutCredentials;
