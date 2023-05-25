"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);
const ProjectsTitle = () => {
  ////vars
  const titleProjectsRef = useRef<HTMLDivElement>(null);

  ////animations
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    function createTl(ref: React.RefObject<HTMLDivElement>) {
      return gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: () => `top top`,
          end: () => `+=170%`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }

    function animate(tl: gsap.core.Timeline) {
      tl.to(titleProjectsRef.current, {
        autoAlpha: 1,
      }).to(titleProjectsRef.current, {
        autoAlpha: 0,
        scale: 50,
        ease: "power4.inOut",
        transformOrigin: "10% 60%",
      });
    }

    mm.add("(max-width: 768px)", () => {
      const tl = createTl(titleProjectsRef);
      animate(tl);
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      const tl = createTl(titleProjectsRef);
      animate(tl);
    });

    mm.add("(min-width: 1224px)", () => {
      const tl = createTl(titleProjectsRef);
      animate(tl);
    });

    return () => {
      mm.revert();
    };
  }, []);

  ////jsx
  return (
    <section title="projectsTitle">
      <div className="w-screen h-screen bg-main_color" ref={titleProjectsRef}>
        <div className="relative flex flex-col items-center justify-center w-screen h-screen">
          <Image
            src="portfolio.svg"
            alt="projects text"
            width={1160}
            height={2000}
            className=" xl:ml-[4px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-[3px]"
            data-testid="projects-section-title"
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
