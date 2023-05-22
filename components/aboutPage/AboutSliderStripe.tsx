"use client";

import React, { useRef } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

type Props = {
  percentage: number;
  isAnimateStripes: boolean;
};

const AboutSliderStripe = (props: Props) => {
  ////vars
  const { percentage, isAnimateStripes } = props;
  const yellowStripeRef = useRef<HTMLDivElement>(null);
  const backgroundStripeRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        yellowStripeRef.current,
        {
          scaleX: 1,
          autoAlpha: 0.4,
        },
        {
          scaleX: percentage / 100,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.inOut",
          paused: true,
        }
      );
      if (isAnimateStripes) anim.play();
    });

    return () => ctx.revert();
  }, [isAnimateStripes]);

  useIsomorphicLayoutEffect(() => {
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
    <div className="relative w-full h-1 mt-[12px] md:mt-4">
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
