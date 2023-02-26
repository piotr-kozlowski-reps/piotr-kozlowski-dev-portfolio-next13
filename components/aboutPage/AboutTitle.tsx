"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDeviceSize from "../../hooks/useDeviceSize";

gsap.registerPlugin(ScrollTrigger);
const AboutTitle = () => {
  ////vars
  const titleRef = useRef<HTMLDivElement>(null);
  const [width, height] = useDeviceSize();

  // /* refresh ScrollTrigger when window size changes */
  // useEffect(() => {
  //   ScrollTrigger.refresh();
  // }, [width, height]);

  ////animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /** ABOUT text animation */
      gsap.to(titleRef.current!, {
        scale: 33,
        opacity: 0,
        scrollTrigger: {
          trigger: titleRef.current,
          start: () => `top top`,
          end: () => `bottom top`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <section title="aboutText">
      <div
        className="flex flex-col items-center justify-center w-full h-screen z-60"
        ref={titleRef}
      >
        <Image
          src="aboutText.svg"
          alt="about text"
          width={1160}
          height={2000}
          className=" xl:ml-[4px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-[3px]"
        />
      </div>
    </section>
  );
};

export default AboutTitle;
