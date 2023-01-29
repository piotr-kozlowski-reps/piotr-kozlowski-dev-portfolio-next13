"use client";

import React, { Fragment, use, useLayoutEffect, useRef, useState } from "react";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "../components/Navigation";
import OpeningPageImageRevealing from "../components/OpeningPageImageRevealing";
import OpeningPageFooter from "../components/OpeningPageFooter";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  ////vars
  const [tl, setTl] = useState(() => gsap.timeline());
  const [openingPageProgress, setOpeningPageProgress] = useState(0);

  // let tlForImageRevealing = useRef<gsap.core.Timeline>(null);

  const openingPageDivRef = useRef<HTMLDivElement>(null);

  // /** Footer Pinned With ScrollTrigger */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setTl(
        gsap.timeline({
          scrollTrigger: {
            trigger: openingPageDivRef.current,
            start: "top top",
            end: "500% top",
            pin: true,
            scrub: 0.8,
            // markers: true,
            onUpdate: (self) => {
              setOpeningPageProgress(Math.floor(self.progress * 100));
            },
          },
        })
      );
    });

    return () => ctx.revert();
  }, []);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     let st = ScrollTrigger.create({
  //       trigger: openingPageDivRef.current,
  //       start: "top top",
  //       end: "bottom top",
  //       pin: true,
  //       scrub: 1,
  //       markers: true,
  //       onUpdate: (self) => {
  //         setOpeningPageProgress(Math.floor(self.progress * 100));
  //       },
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  ////jsx
  return (
    <Fragment>
      {/* Fixed Navigation */}
      <div className="fixed top-0 w-screen h-screen z-max ">
        <div className="xl:w-[1220px] xl:h-full relative xl:mx-auto z-10 ">
          <Navigation />
        </div>
      </div>

      {/* Opening Page Section */}
      <section ref={openingPageDivRef}>
        <div className="w-full h-full bg-background_1_lighter">
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
            <OpeningPageImageRevealing tl={tl} progress={openingPageProgress} />
            <OpeningPageFooter />
          </div>
        </div>
      </section>
      <div className="w-screen h-screen bg-background_2_darker">1szy div</div>
      <div className="w-screen h-screen bg-background_2_darker">2gi div</div>
      <div className="w-screen h-screen bg-background_2_darker">3ci div</div>
    </Fragment>
  );
};

export default Home;
