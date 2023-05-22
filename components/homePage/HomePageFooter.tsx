import React, { useRef } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import Image from "next/image";
import gsap from "gsap";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const HomePageFooter = () => {
  ///vars
  const [width, _height] = useDeviceSize();

  const footerRef = useRef<HTMLDivElement>(null);
  const footerBackgroundRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(null);

  ////effects
  /** ClipPaths background in Footer */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap.to(footerBackgroundRef.current, {
          clipPath: "polygon(60% 55%, 100% 33%, 100% 100%, 0% 100%, 0% 39%)",
          duration: 0.3,
        });
      });
      mm.add("(min-width: 769px)", () => {
        gsap.to(footerBackgroundRef.current, {
          clipPath: "polygon(55% 45%, 100% 0%, 100% 100%, 0% 100%, 0% 12%)",
          duration: 0.3,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /** Mouse teasing animation */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mouseRef.current, {
        y: -4,
        autoAlpha: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        yoyoEase: "power4.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <div className="relative h-screen bg-background_1_lighter" ref={footerRef}>
      <div
        className="absolute bottom-0 z-30 w-full h-36 bg-background_2_darker clip-path-footer-start" //hidden?
        ref={footerBackgroundRef}
      ></div>
      <div
        className="absolute z-30 flex items-center justify-center w-full bottom-2 "
        ref={mouseRef}
      >
        {width < 768 ? (
          <Image
            src={"/scrollDown_finger.svg"}
            alt="Scroll, please"
            width={44}
            height={44}
            className="cursor-pointer md:cursor-default"
          />
        ) : (
          <Image
            src={"/scrollDown_mouse.svg"}
            alt="Scroll, please"
            width={44}
            height={44}
          />
        )}
      </div>
    </div>
  );
};

export default HomePageFooter;
