"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import useDeviceSize from "../hooks/useDeviceSize";

import Navigation from "./Navigation";

const Home = () => {
  ////vars
  const [tl, setTl] = useState(() => gsap.timeline());
  const [width, height] = useDeviceSize();

  const footerRef = useRef<HTMLDivElement>(null);
  const footerBackgroundRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(null);

  ////jsx
  return (
    <div
      className="h-screen flex flex-col justify-between bg-background_1_lighter relative"
      style={
        {
          // backgroundImage: `url("/opening_page_mobile.png")`,
          // backgroundImage: `url("/opening_page_tablet.png")`,
          // backgroundImage: `url("/opening_page_desktop.png")`,
        }
      }
    >
      <div className="xl:w-[1220px] xl:h-full relative xl:mx-auto">
        <Navigation timeline={tl} footerRef={footerRef} />
      </div>
      <div className="relative bg-background-1" ref={footerRef}>
        <div
          className="w-full absolute -bottom-1 h-24 bg-background-2 clip-path-footerStartStatePath"
          ref={footerBackgroundRef}
        ></div>
        <div
          className="absolute bottom-2 flex justify-center items-center w-full"
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
              className="cursor-pointer md:cursor-default"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
