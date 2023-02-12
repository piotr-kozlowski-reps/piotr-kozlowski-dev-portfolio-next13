"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  percentage: number;
  addSliderElement: (el: React.RefObject<HTMLDivElement>) => void;
};

gsap.registerPlugin(ScrollTrigger);
const AboutSliderStripe = (props: Props) => {
  ////vars
  const { percentage, addSliderElement } = props;
  let yellowStripeRef = useRef<HTMLDivElement>(null);

  ////animation
  // useEffect(() => {
  //   addSliderElement(yellowStripeRef);
  // }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(yellowStripeRef.current, {
        scrollTrigger: {
          trigger: yellowStripeRef.current,
          scrub: true,
          start: "top bottom",
          end: "top top",
          markers: true,
        },
        autoAlpha: 1,
        transformOrigin: "left center",
        ease: "none",
      });
      // ScrollTrigger.create({
      //   trigger: yellowStripeRef.current
      // });
      // const tlDeveloperSlidersSection = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: yellowStripeRef.current,
      //     start: "top 204px",
      //     end: "+=350%",
      //     markers: true,
      //     scrub: 0.8,
      //     pin: true,
      //   },
      // });
      // tlDeveloperSlidersSection.to(yellowStripeRef.current, {});
    });

    return ctx.revert();
  }, []);

  ////jsx
  return (
    <div className="relative w-full h-1 mt-4 bg-background_1_lighter border-x-[1px]">
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-start`}
        ref={yellowStripeRef}
      >
        <div className="w-full h-full bg-main_color border-x-[1px] origin-top-left"></div>
      </div>
    </div>
  );
};

export default AboutSliderStripe;
