"use client";

import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap, Power4 } from "gsap";
import Image from "next/image";
import useDeviceSize from "../hooks/useDeviceSize";

import Navigation from "./Navigation";
import OpeningPageImageRevealing from "../components/OpeningPageImageRevealing";

const Home = () => {
  ////vars
  const [tl, setTl] = useState(() => gsap.timeline());
  const [width, height] = useDeviceSize();

  const footerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const footerBackgroundRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(null);

  //// sideEffects
  /** mouse teaser clipping mask background animations */

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.to(footerBackgroundRef.current, {
  //       clipPath: "polygon(60% 55%, 100% 33%, 100% 100%, 0% 100%, 0% 39%)",
  //       duration: 0.3,
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  useLayoutEffect(() => {
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
      // mm.add("(max-width: 1219px)", () => {
      //   gsap.to(footerBackgroundRef.current, {
      //     clipPath: "polygon(60% 44%, 100% 12%, 100% 100%, 0% 100%, 0% 22%)",
      //     duration: 0.3,
      //   });
      // });
      // mm.add("(min-width: 1220px)", () => {
      //   gsap.to(footerBackgroundRef.current, {
      //     clipPath: "polygon(55% 45%, 100% 0%, 100% 100%, 0% 100%, 0% 12%)",
      //     duration: 0.3,
      //   });
      // });
    });

    return () => ctx.revert();
  }, []);

  /** Mouse teasing animation */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mouseRef.current, {
        y: -4,
        autoAlpha: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        yoyoEase: Power4.easeIn,
      });
    });
    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <Fragment>
      {/* fixed navigation - start */}
      <div className="fixed top-0 w-screen h-screen z-max">
        {/* <div className="fixed top-0 w-full h-20"> */}
        <div className="xl:w-[1220px] xl:h-full relative xl:mx-auto z-10">
          <Navigation timeline={tl} footerRef={footerRef} />
        </div>
      </div>
      {/* fixed navigation - end */}

      <div className="relative w-full h-full bg-background_2_darker">
        <div
          className="relative flex flex-col justify-between h-screen bg-background_1_lighter"
          style={
            {
              // backgroundImage: `url("/opening_page_mobile.png")`,
              // backgroundImage: `url("/opening_page_tablet.png")`,
              // backgroundImage: `url("/opening_page_desktop.png")`,
              // backgroundImage: `url("/opening_page___mobile_Menu.png")`,
            }
          }
        >
          {/* image revealing + text */}
          {/* <OpeningPageImageRevealing /> */}

          {/* footer */}
          <div className="relative bg-background_1_lighter" ref={footerRef}>
            <div
              className="absolute bottom-0 w-full h-36 bg-background_2_darker clip-path-footer-start" //hidden?
              ref={footerBackgroundRef}
            ></div>
            <div
              className="absolute flex items-center justify-center w-full bottom-2"
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
        </div>
        <div className="w-screen h-screen">1szy div</div>
        <div className="w-screen h-screen">2gi div</div>
        <div className="w-screen h-screen">3ci div</div>
      </div>
    </Fragment>
  );
};

export default Home;
