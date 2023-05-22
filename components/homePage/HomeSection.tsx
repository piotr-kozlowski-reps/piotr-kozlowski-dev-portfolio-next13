"use client";

import React, { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import HomePageFooter from "./HomePageFooter";

gsap.registerPlugin(ScrollTrigger);
const HomeSection = () => {
  ////vars
  const wholeSectionRef = useRef<HTMLDivElement>(null);
  const imageBackgroundBase = useRef<HTMLDivElement>(null);

  ////animation
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(wholeSectionRef.current, { x: "-100vw", duration: 1 });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <Fragment>
      <div
        className="relative flex flex-col justify-between h-screen overflow-x-hidden overflow-y-hidden bg-background_1_lighter"
        ref={wholeSectionRef}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen">
          <div
            className="fixed top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url("/bg-landing-page___developer.jpg")`,
            }}
            ref={imageBackgroundBase}
          ></div>
        </div>
      </div>
      <HomePageFooter />
    </Fragment>
  );
};

export default HomeSection;
