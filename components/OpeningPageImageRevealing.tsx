import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Fragment, useLayoutEffect, useRef } from "react";
import { start } from "repl";

type Props = {
  tl: gsap.core.Timeline;
  progress: number;
};

/** avoid start animation when site starts in mobile mode
 * "(max-width: 768px)" animation when starts only when number of renders is more than initial 2
 * counts from 0 so: 0, 1, trigger*/
let isFirstRender = 0;

gsap.registerPlugin(ScrollTrigger);
const OpeningPageImageRevealing = (props: Props) => {
  const { tl, progress } = props;
  // const imageBackground_start = useRef<HTMLDivElement>(null);
  const imageBackgroundBase = useRef<HTMLDivElement>(null);
  const imageBackgroundDesign = useRef<HTMLDivElement>(null);
  const designText = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isFirstRender > 1) {
        tl.addLabel("start")
          .fromTo(
            imageBackgroundBase.current,
            { opacity: 1, ease: Power4.easeOut },
            { opacity: 0 }
          )
          .fromTo(
            imageBackgroundDesign.current,
            { opacity: 0 },
            { opacity: 1 },
            "start"
          );
      }
    });

    isFirstRender += 1;
    return () => ctx.revert();
  }, [tl]);

  // useLayoutEffect(() => {
  //   if (isFirstRender > 1) {
  //     tl.fromTo(
  //       imageBackground_innerDiv.current,
  //       {
  //         clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  //       },
  //       {
  //         clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  //       }
  //     );
  //   }
  //   isFirstRender += 1;
  // }, [tl]);

  // const background1Start: gsap.TweenVars = {
  //   clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 19%)",
  //   duration: 0.3,
  // };
  // const background1End: gsap.TweenVars = {
  //   clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  //   duration: 0.3,
  // };

  console.log(progress);
  console.log(tl);

  // useLayoutEffect(() => {
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

  return (
    <Fragment>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("/bg-landing-page.jpg")`,
        }}
        ref={imageBackgroundBase}
      ></div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover afterImage_outer"
        // style={{
        //   backgroundImage: `url("/bg-landing-page_revealed.jpg")`,
        // }}
      >
        <div
          // className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner clip-path-image_revealing"
          className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner"
          style={{
            backgroundImage: `url("/bg-landing-page_design.jpg")`,
          }}
          ref={imageBackgroundDesign}
        ></div>
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-40 w-screen h-screen"
        ref={designText}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-20 ml-16 mr-[25px]  xl:mr-16 bg-red-500"></div>
        </div>
      </div>
    </Fragment>
  );

  // return (
  //   <div className="test-images">
  //     <section className="comparisonSection" ref={imageSectionRef}>
  //       <div className="comparisonImage beforeImage">
  //         <img src="https://assets.codepen.io/16327/before.jpg" alt="before" />
  //       </div>
  //       <div className="comparisonImage afterImage">
  //         <img src="https://assets.codepen.io/16327/after.jpg" alt="after" />
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default OpeningPageImageRevealing;
