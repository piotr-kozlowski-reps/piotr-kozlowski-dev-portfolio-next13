"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { TAddSliderToAnimation } from "../../types/typings";

type Props = {
  percentage: number;
  addSliderElement: TAddSliderToAnimation;
};

const AboutSliderStripe = (props: Props) => {
  ////vars
  const { percentage, addSliderElement } = props;
  let yellowStripeRef = useRef<HTMLDivElement>(null);
  let backgroundStripeRef = useRef<HTMLDivElement>(null);

  /* add all sliders to parent array */
  useLayoutEffect(() => {
    addSliderElement({ element: yellowStripeRef, percentage });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backgroundStripeRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power4.inOut",
          duration: 3,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <div className="relative w-full h-1 mt-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-background_1_lighter"
        ref={backgroundStripeRef}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full border-x-[1px]"></div>
      <div
        className="absolute top-0 left-0 flex justify-start invisible w-full h-full origin-top-left"
        ref={yellowStripeRef}
      >
        <div className="w-full h-full origin-top-left bg-main_color"></div>
      </div>
    </div>
  );
};

export default AboutSliderStripe;
