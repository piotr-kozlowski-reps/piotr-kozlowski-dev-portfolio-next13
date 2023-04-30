import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

// type Props = {
//   tl: gsap.core.Timeline;
// };

/** avoid start animation when site starts in mobile mode
 * "(max-width: 768px)" animation when starts only when number of renders is more than initial 2
 * counts from 0 so: 0, 1, trigger */
let isFirstRender = 0;

gsap.registerPlugin(ScrollTrigger);
const HomePageImageRevealing = () => {
  ////vars
  const wholeSectionRef = useRef<HTMLDivElement>(null);
  const imageBackgroundBase = useRef<HTMLDivElement>(null);
  const bigDRef = useRef<HTMLImageElement>(null);
  const asRef = useRef<HTMLImageElement>(null);
  const developerRef = useRef<HTMLImageElement>(null);

  ////animation
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /** durationMultiplier: number => 1 is no change, every duration is multiplied by this factor */
      function textSliderFromRightAnimation(
        target: gsap.TweenTarget,
        durationMultiplier: number
      ) {
        const tlFirstSetTexts = gsap.timeline();
        tlFirstSetTexts
          .fromTo(
            target,
            {
              x: "100vh",
              autoAlpha: 0,
              filter: "blur(20px)",
            },
            {
              x: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            }
          )
          .to(target, {
            duration: 0.6 * durationMultiplier,
          })
          .fromTo(
            target,
            {
              x: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
            },
            {
              x: 0,
              autoAlpha: 0,
              filter: "blur(30px)",
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            }
          );

        return tlFirstSetTexts;
      }
      function mainTextAnimation(
        target: gsap.TweenTarget,
        durationMultiplier: number
      ) {
        const tlFirstSetTexts = gsap.timeline();
        tlFirstSetTexts
          .fromTo(
            target,
            {
              x: "100vh",
              autoAlpha: 0,
              filter: "blur(20px)",
              scale: 1,
            },
            {
              x: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              scale: 1.01,
              duration: 0.4 * durationMultiplier,
              ease: "expo",
            }
          )
          .to(target, {
            duration: 2.5 * durationMultiplier,
            scaleY: 1.05,
            scale: 1.025,
          })
          .fromTo(
            target,
            {
              scale: 1.025,
              autoAlpha: 1,
              filter: "blur(0px)",
            },
            {
              autoAlpha: 0,
              filter: "blur(3px)",
              scale: 25,
              duration: 3 * durationMultiplier,
              ease: "expo",
            }
          );

        return tlFirstSetTexts;
      }

      //main Timeline
      const allElementsMoveToBeInvisible = [
        bigDRef.current,
        asRef.current,
        developerRef.current,
      ];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // tl.add(mainTextAnimation(developerRef.current, 1));

      // tl.fromTo(
      //   allElementsMoveToBeInvisible,
      //   { x: "100vh" },
      //   { x: "100vh", duration: 2 }
      // )
      //   .add(textSliderFromRightAnimation(bigDRef.current, 0.9))
      //   .add(textSliderFromRightAnimation(asRef.current, 0.8), "-=0.5")
      //   .add(mainTextAnimation(developerRef.current, 1.1), "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  // useIsomorphicLayoutEffect(() => {
  //   const mm = gsap.matchMedia();

  //   function createTl() {
  //     return gsap.timeline({
  //       scrollTrigger: {
  //         trigger: wholeSectionRef.current,
  //         start: () => "top top",
  //         end: () => "+=300%",
  //         markers: true,
  //         pin: true,
  //       },
  //     });
  //   }

  //   mm.add("(max-width: 768px)", () => {
  //     const tl = createTl();
  //   });
  //   mm.add("(min-width: 769px) and (max-width: 1223px)", () => {});
  //   mm.add("(min-width: 1224px)", () => {});

  //   return () => mm.revert();
  // }, []);

  // useIsomorphicLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // if (isFirstRender > 1) {
  //       // tl.addLabel("design").fromTo(
  //       //   imageBackgroundBase.current,
  //       //   { opacity: 0, ease: "power4.inOut" },
  //       //   { opacity: 1 }
  //       // );
  //       // .fromTo(
  //       //   imageBackgroundDesign.current,
  //       //   { opacity: 0 },
  //       //   { opacity: 1 },
  //       //   "design"
  //       // )
  //       // .fromTo(designText.current, { opacity: 0 }, { opacity: 1 }, "design")
  //       // .addLabel("develop")
  //       // .fromTo(
  //       //   imageBackgroundDevelop.current,
  //       //   { opacity: 0 },
  //       //   { opacity: 1 },
  //       //   "develop"
  //       // )
  //       // .fromTo(designText.current, { opacity: 1 }, { opacity: 0 }, "develop")
  //       // .fromTo(
  //       //   developText.current,
  //       //   { opacity: 0 },
  //       //   { opacity: 1 },
  //       //   "develop"
  //       // );
  //     }
  //   // });

  //   // isFirstRender += 1;
  //   return () => ctx.revert();
  // }, []);

  // useIsomorphicLayoutEffect(() => {
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

  // useIsomorphicLayoutEffect(() => {
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
      <div className="relative z-20 w-screen h-300vh" ref={wholeSectionRef}>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___developer.jpg")`,
          }}
          ref={imageBackgroundBase}
        ></div>

        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
          <div className="absolute px-8 scale-[220%] -translate-x-1/2 -translate-y-1/2 md:scale-110 xl:scale-75 top-1/2 left-1/2">
            <Image
              src="/big_d.svg"
              alt="big letter D"
              width={1024}
              height={1024}
              className="invisible"
              ref={bigDRef}
            />
          </div>
        </div>

        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
          <div className="absolute px-8 scale-[220%] -translate-x-1/2 -translate-y-1/2 md:scale-125 xl:scale-75 top-1/2 left-1/2">
            <Image
              src="/as.svg"
              alt="as"
              width={1024}
              height={1024}
              className="invisible"
              ref={asRef}
            />
          </div>
        </div>

        <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
          <div className="absolute px-8 scale-[220%] -translate-x-1/2 -translate-y-1/2 md:scale-150 xl:scale-125 top-1/2 left-1/2">
            <Image
              src="/developer.svg"
              alt="as"
              width={1024}
              height={1024}
              className="invisible"
              ref={developerRef}
            />
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
          }}
          ref={imageBackgroundBase}
        ></div>

        {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
          <div
            className="absolute px-8 scale-[220%] -translate-x-1/2 -translate-y-1/2 md:scale-125 xl:scale-75 top-1/2 left-1/2 invisible"
            ref={asRef}
          >
            <Image
              src="/big_d.svg"
              alt="project image"
              width={1024}
              height={1024}
            />
          </div>
        </div> */}
      </div>

      {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 invisible h-screen bg-center bg-no-repeat bg-cover afterImage_outer ">
          <div
            className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner "
            style={{
              backgroundImage: `url("/bg-landing-page_design.jpg")`,
            }}
            ref={imageBackgroundDesign}
          ></div>
        </div> */}
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 invisible h-screen bg-center bg-no-repeat bg-cover afterImage_outer ">
          <div
            className="z-30 w-full h-full bg-center bg-no-repeat bg-cover afterImage_inner "
            style={{
              backgroundImage: `url("/bg-landing-page_develop.jpg")`,
            }}
            ref={imageBackgroundDevelop}
          ></div> 
        </div>
      </div>*/}

      {/* develop text */}
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-40 invisible w-full h-full ">
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
      </div> */}

      {/* design text */}
      {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-40 invisible w-full h-full ">
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
      </div> */}
    </Fragment>
  );
};

export default HomePageImageRevealing;
