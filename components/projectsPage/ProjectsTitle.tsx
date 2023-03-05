"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ProjectsTitle = () => {
  ////vars
  const titleProjectsRef = useRef<HTMLDivElement>(null);

  ////animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleProjectsRef.current, {
        // scale: 33,
        autoAlpha: 0,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: titleProjectsRef.current,
          start: () => `top top`,
          end: () => `bottom top`,
          markers: true,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  ////jsx
  return (
    <section title="projectsTitle">
      <div
        className="w-screen h-screen bg-main_color z-60"
        ref={titleProjectsRef}
      >
        <div className="relative flex flex-col items-center justify-center w-screen h-screen z-60 ">
          <Image
            src="portfolio.svg"
            alt="projects text"
            width={1160}
            height={2000}
            className=" xl:ml-[4px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-[3px]"
          />
          <div className="absolute top-0 left-0 w-full h-[180px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 180"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H361L317 111L0 180V0Z" fill="#26292E" />
            </svg>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-[180px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 360 180"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M361 180H0L180 62L361 0V180Z" fill="#26292E" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTitle;
