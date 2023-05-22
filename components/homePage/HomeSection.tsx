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
    // gsap.to(wholeSectionRef.current, {
    //   x: "100vh",
    //   scrollTrigger: {
    //     trigger: wholeSectionRef.current,
    //     start: () => `top top`,
    //     end: () => `+=300%`,
    //     // pin: true,
    //     scrub: 0.8,
    //     markers: true,
    //     invalidateOnRefresh: true,
    //   },
    // });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(wholeSectionRef.current, { x: "-100vw", duration: 1 });
    });

    return () => ctx.revert();
  }, []);
  // useIsomorphicLayoutEffect(() => {
  //   const mm = gsap.matchMedia();

  //   function createTl() {
  //     return gsap.timeline({
  //       scrollTrigger: {
  //         trigger: wholeSectionRef.current,
  //         start: () => `top top`,
  //         end: () => `+=200%`,
  //         markers: true,
  //         pin: true,
  //         scrub: 0.8,
  //         anticipatePin: 1,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   }

  //   function animate(tl: gsap.core.Timeline) {
  //     tl.addLabel("start").fromTo(
  //       imageBackgroundReal.current,
  //       { autoAlpha: 0 },
  //       { autoAlpha: 1 }
  //     );
  //   }

  //   console.log(wholeSectionRef.current);

  //   mm.add("(max-width: 768px)", () => {
  //     const tl = createTl();
  //     animate(tl);
  //   });
  //   mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
  //     const tl = createTl();
  //     animate(tl);
  //   });
  //   mm.add("(min-width: 1224px)", () => {
  //     const tl = createTl();
  //     animate(tl);
  //   });

  //   return () => mm.revert();
  // }, [wholeSectionRef.current]);

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
          {/* <div className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen">
            <div
              className="absolute top-0 bottom-0 left-0 right-0 z-20 invisible h-screen bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url("/bg-landing-page.jpg")`,
              }}
              ref={imageBackgroundReal}
            ></div>
          </div> */}
        </div>
      </div>
      <HomePageFooter />
    </Fragment>
  );
};

export default HomeSection;

//   <div
//     className="relative flex flex-col justify-between h-screen bg-background_1_lighter"
//     // style={
//     // {
//     // backgroundImage: `url("/opening_page_mobile.png")`,
//     // backgroundImage: `url("/opening_page_tablet.png")`,
//     // backgroundImage: `url("/opening_page_desktop.png")`,
//     // backgroundImage: `url("/opening_page___mobile_Menu.png")`,
//     // backgroundImage: `url("/about_developer.png")`,
//     // }
//     // }
//   >
//     <HomePageImageRevealing />
//     <HomePageFooter />
//   </div>
