import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useLayoutEffect, useRef } from "react";

type Props = {
  tl: gsap.core.Timeline;
};

/** avoid start animation when site starts in mobile mode
 * "(max-width: 768px)" animation when starts only when number of renders is more than initial 2
 * counts from 0 so: 0, 1, trigger */
let isFirstRender = 0;

gsap.registerPlugin(ScrollTrigger);
const HomePageImageRevealing = (props: Props) => {
  const { tl } = props;
  // const imageBackground_start = useRef<HTMLDivElement>(null);
  const imageBackgroundBase = useRef<HTMLDivElement>(null);
  const imageBackgroundDesign = useRef<HTMLDivElement>(null);
  const imageBackgroundDevelop = useRef<HTMLDivElement>(null);
  const designText = useRef<HTMLDivElement>(null);
  const developText = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isFirstRender > 1) {
        tl.addLabel("design")
          .fromTo(
            imageBackgroundBase.current,
            { opacity: 1, ease: "power4.inOut" },
            { opacity: 0 }
          )
          .fromTo(
            imageBackgroundDesign.current,
            { opacity: 0 },
            { opacity: 1 },
            "design"
          )
          .fromTo(designText.current, { opacity: 0 }, { opacity: 1 }, "design")
          .addLabel("develop")
          .fromTo(
            imageBackgroundDevelop.current,
            { opacity: 0 },
            { opacity: 1 },
            "develop"
          )
          .fromTo(designText.current, { opacity: 1 }, { opacity: 0 }, "develop")
          .fromTo(
            developText.current,
            { opacity: 0 },
            { opacity: 1 },
            "develop"
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

  ////jsx
  return (
    <Fragment>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover "
        style={{
          backgroundImage: `url("/bg-landing-page.jpg")`,
        }}
        ref={imageBackgroundBase}
      ></div>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover afterImage_outer ">
        <div
          className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner "
          style={{
            backgroundImage: `url("/bg-landing-page_design.jpg")`,
          }}
          ref={imageBackgroundDesign}
        ></div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-20 invisible h-screen bg-center bg-no-repeat bg-cover afterImage_outer ">
        <div
          className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner "
          style={{
            backgroundImage: `url("/bg-landing-page_develop.jpg")`,
          }}
          ref={imageBackgroundDevelop}
        ></div>
      </div>

      {/* develop text */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-40 invisible w-full h-full ">
        <div
          className="flex flex-col items-center justify-center w-full h-full"
          ref={developText}
        >
          <Link href="/">
            <Image
              src="develop.svg"
              alt="develop text"
              width={1160}
              height={2000}
              className=" xl:ml-[9px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-0"
            />
          </Link>
        </div>
      </div>

      {/* design text */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-40 invisible w-full h-full ">
        <div
          className="flex flex-col items-center justify-center w-full h-full bg-red-600"
          ref={designText}
        >
          <Link href="/">
            <Image
              src="design.svg"
              alt="design text"
              width={1164}
              height={2000}
              className=" pl-[31px] pr-[31px] xl:pl-0 xl:pr-0 xl:ml-2"
              // onClick={alertHandler.bind(null, "github - not implemented")}
            />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePageImageRevealing;
