import Image from "next/image";
import React, { useRef, useState } from "react";

import AboutCredentialItem from "../../old/AboutCredentialItem__old";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../data/data.json";
import { animated, useSpring } from "@react-spring/web";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);
const AboutCredentials = () => {
  ////vars
  const { credentialItems } = data;

  const [credentialIndex, setCredentialIndex] = useState(0);

  //initial Morph
  const morphBackgroundFill = [
    "M0 11V259L180 215.5L360 172V0L215 45.5L0 11Z",
    "M0 24V212.5L180 260L360 236V41.5L215 1L0 24Z",
    "M0 0V259L122.5 224.5L360 241V15.5L202 47L0 0Z",
    "M0 25V192.5L138.5 237L360 259V42L249 0L0 25Z",
  ];
  const morphBackgroundStroke = [
    "M215 45.125L107.5 28.0625L32 16",
    "M328 32.5L276 18L215 1",
    "M328 238.5L230 232L122.5 224.5",
    "M139 237L92.5 222.5L32 203",
  ];
  const [backgroundAnimationProps, apiBackgroundAnimation] = useSpring(() => ({
    backgroundFill: morphBackgroundFill[0],
    backgroundStroke: morphBackgroundStroke[0],
  }));

  // //refs
  const credentialItemsSectionRef = useRef<HTMLDivElement>(null);
  const credentialPortraitRef = useRef<HTMLDivElement>(null);
  const credentialParagraphRef = useRef<HTMLDivElement>(null);

  ////animations
  useIsomorphicLayoutEffect(() => {
    let mm = gsap.matchMedia();

    //helper functions
    function createTl() {
      return gsap.timeline({
        scrollTrigger: {
          trigger: credentialItemsSectionRef.current,
          start: () => "center center",
          end: () => "+=" + credentialItemsSectionRef.current!.offsetHeight * 8,
          // markers: true,
          pin: true,
          scrub: 0.8,
        },
      });
    }
    function credentialAnimationIn() {
      let tl = gsap.timeline();

      tl.addLabel("credential1Start")
        .fromTo(
          credentialPortraitRef.current,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1 },
          "credential1Start"
        )
        .fromTo(
          credentialParagraphRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "credential1Start"
        );
      return tl;
    }
    function credentialAnimationOut() {
      let tl = gsap.timeline();

      tl.addLabel("credential1Start")
        .to(
          credentialPortraitRef.current,
          { autoAlpha: 0, scale: 0 },
          "credential1Start"
        )
        .to(
          credentialParagraphRef.current,
          { autoAlpha: 0, x: "-100vw" },
          "credential1Start"
        );
      return tl;
    }
    function animate(tl: gsap.core.Timeline) {
      tl.addLabel("fadeIn")
        .fromTo(
          credentialItemsSectionRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1 }
        )
        .addLabel("credential0")
        .call(() => {
          setCredentialIndex(() => 0);
          apiBackgroundAnimation.set({
            backgroundFill: morphBackgroundFill[0],
            backgroundStroke: morphBackgroundStroke[0],
          });
        })
        .add(credentialAnimationIn())
        .to(credentialItemsSectionRef.current, {})
        .add(credentialAnimationOut())
        .call(() => {
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[0],
            backgroundStroke: morphBackgroundStroke[0],
          });
          setCredentialIndex(() => 0);
        })
        .addLabel("credential1")
        .call(() => {
          setCredentialIndex(() => 1);
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[1],
            backgroundStroke: morphBackgroundStroke[1],
          });
        })
        .add(credentialAnimationIn())
        .to(credentialItemsSectionRef.current, {})
        .add(credentialAnimationOut())
        .call(() => {
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[1],
            backgroundStroke: morphBackgroundStroke[1],
          });
          setCredentialIndex(() => 1);
        })
        .addLabel("credential2")
        .call(() => {
          setCredentialIndex(() => 2);
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[2],
            backgroundStroke: morphBackgroundStroke[2],
          });
        })
        .add(credentialAnimationIn())
        .to(credentialItemsSectionRef.current, {})
        .add(credentialAnimationOut())
        .call(() => {
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[2],
            backgroundStroke: morphBackgroundStroke[2],
          });
          setCredentialIndex(() => 2);
        })
        .addLabel("credential3")
        .call(() => {
          setCredentialIndex(() => 3);
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[3],
            backgroundStroke: morphBackgroundStroke[3],
          });
        })
        .add(credentialAnimationIn())
        .to(credentialItemsSectionRef.current, {})
        .add(credentialAnimationOut())
        .call(() => {
          apiBackgroundAnimation.start({
            backgroundFill: morphBackgroundFill[3],
            backgroundStroke: morphBackgroundStroke[3],
          });
          setCredentialIndex(() => 3);
        })
        .addLabel("finalFadeOut")
        .fromTo(
          credentialItemsSectionRef.current,
          { autoAlpha: 1 },
          { autoAlpha: 0 }
        );
    }

    mm.add("(max-width: 768px)", () => {
      const tl = createTl();
      animate(tl);
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      const tl = createTl();
      animate(tl);
    });

    mm.add("(min-width: 1224px)", () => {
      const tl = createTl();
      animate(tl);
    });

    return () => mm.revert();
  }, []);

  ////jsx
  return (
    <div
      className="relative invisible w-screen h-screen"
      ref={credentialItemsSectionRef}
    >
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="relative w-full xl:w-[566px]">
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 259"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <animated.path
                d={backgroundAnimationProps.backgroundFill}
                fill="#2C2F36"
              />
              <animated.path
                d={backgroundAnimationProps.backgroundStroke}
                stroke="#FCEB41"
              />
            </svg>
          </div>
          <div
            className="w-[44px] md:w-[88px] xl:w-[128px] h-[44px] md:h-[88px] xl:h-[128px] mx-auto invisible"
            ref={credentialPortraitRef}
          >
            <Image
              src={credentialItems[credentialIndex].portraitImgUrl}
              height={128}
              width={128}
              alt="credentials portrait"
            />
          </div>
          <div className="">
            <p
              className="invisible mx-8 mt-4 mb-0 text-center md:mb-4 md:mt-8 xl:mb-16 font-style-sm xl:font-style-p z-60"
              ref={credentialParagraphRef}
            >
              {credentialItems[credentialIndex].credentialText}
            </p>
          </div>
          <div className="w-full h-[88px]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutCredentials;
