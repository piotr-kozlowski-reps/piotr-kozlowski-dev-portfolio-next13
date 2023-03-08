import React, { useRef } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import Image from "next/image";
import gsap from "gsap";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const HomePageFooter = () => {
  ///vars

  const [width, height] = useDeviceSize();

  const footerRef = useRef<HTMLDivElement>(null);
  const footerBackgroundRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(null);

  ////effects
  /** ClipPaths background in Footer */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

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

  /** Footer Pinned With ScrollTrigger */

  // useIsomorphicLayoutEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: triggerDiv,
  //       scrub: 1,
  //       // pin: true,
  //     },
  //   });
  // gsap.to(footerRef.current, {
  //   scrollTrigger: {
  //     trigger: triggerDiv,
  //     start: 0,
  //     end: () => {
  //       return window.innerHeight;
  //     },
  //     markers: true,
  //     scrub: true,
  //     // pin: true,
  //   },
  // });
  //   gsap.utils.toArray(".comparisonSection").forEach((section) => {
  //     let tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: imageSectionRef.current!,
  //         start: "top top",
  //         // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
  //         end: () => "+=" + imageSectionRef.current!.offsetWidth,
  //         markers: true,
  //         scrub: 4,
  //         // pin: true,
  //         // anticipatePin: 1,
  //       },
  //       defaults: { ease: "none" },
  //     });
  //     // animate the container one way...
  //     tl.fromTo(
  //       imageSectionRef.current!.querySelector(".afterImage"),
  //       { xPercent: 100, x: 0 },
  //       { xPercent: 0 }
  //     )
  //       // ...and the image the opposite way (at the same time)
  //       .fromTo(
  //         imageSectionRef.current!.querySelector(".afterImage img"),
  //         { xPercent: -100, x: 0 },
  //         { xPercent: 0 },
  //         0
  //       );
  //   });
  // }, []);

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
