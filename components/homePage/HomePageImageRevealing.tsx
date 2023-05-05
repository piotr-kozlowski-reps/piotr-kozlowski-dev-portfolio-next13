import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
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
  const [width, height, mediaSizeName] = useDeviceSize();

  const wholeSectionRef = useRef<HTMLDivElement>(null);
  const imageBackgroundBase = useRef<HTMLDivElement>(null);

  const yellowColorBase = useRef<HTMLDivElement>(null);
  const clippathDMaskRef = useRef<SVGClipPathElement>(null);

  const bigDRef = useRef<HTMLImageElement>(null);
  const asRef = useRef<HTMLImageElement>(null);
  const developerRef = useRef<HTMLImageElement>(null);

  const pathRef = useRef<SVGPathElement>(null);

  ////animation
  useIsomorphicLayoutEffect(() => {
    //utils
    const centerInXAxis = (
      imageBackgroundBase: HTMLDivElement,
      svgPath: SVGPathElement
    ) => {
      return (
        Math.floor(imageBackgroundBase.clientWidth / 2) -
        Math.floor(svgPath.getBBox().width / 2)
      );
    };

    const centerInYAxis = (
      imageBackgroundBase: HTMLDivElement,
      svgPath: SVGPathElement
    ) => {
      return (
        Math.floor(imageBackgroundBase.clientHeight / 2) -
        Math.floor(svgPath.getBBox().height / 2)
      );
    };

    //context
    const ctx = gsap.context(() => {
      /** durationMultiplier: number => 1 is no change, every duration is multiplied by this factor */
      function textSliderFromRightAnimation(
        clipPath: SVGClipPathElement,
        imageBase: HTMLDivElement,
        path: SVGPathElement,
        durationMultiplier: number
      ) {
        const tlTextSliderFromRight = gsap.timeline();
        tl.fromTo(
          clipPath,
          {
            x: centerInXAxis(imageBase, path) + width,
            y: centerInYAxis(imageBase, path),
            scale: 1.4,
            transformOrigin: "50% 50%",
            autoAlpha: 0,
            filter: "blur(20px)",
          },

          {
            x: centerInXAxis(imageBase, path),
            y: centerInYAxis(imageBase, path),
            scale: 1.4,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.5 * durationMultiplier,
            ease: "expo",
          }
        )
          .to(clipPath, {
            duration: 0.6 * durationMultiplier,
          })
          .fromTo(
            clipPath,
            {
              filter: "blur(0px)",
              autoAlpha: 1,
              x: centerInXAxis(imageBase, path),
            },
            {
              x: centerInXAxis(imageBase, path) - width,
              filter: "blur(30px)",
              autoAlpha: 0,
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            }
          );
        // .fromTo(
        //   target,
        //   {
        //     x: 0,
        //     autoAlpha: 1,
        //     filter: "blur(0px)",
        //   },
        //   {
        //     x: 0,
        //     autoAlpha: 0,
        //     filter: "blur(30px)",
        //     duration: 0.5 * durationMultiplier,
        //     ease: "expo",
        //   }
        // );

        return tlTextSliderFromRight;
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
      const allElementsMoveToBeInvisible: SVGClipPathElement[] = [
        // yellowColorBase.current!,
        clippathDMaskRef.current!,
        // developerRef.current,
      ];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // tl.fromTo(
      //   clippathRef.current,
      //   {
      //     x: centerInXAxis(imageBackgroundBase.current!, pathRef.current!),
      //     y: centerInYAxis(imageBackgroundBase.current!, pathRef.current!),
      //     scale: 1.4,
      //     transformOrigin: "50% 50%",
      //   },

      //   {
      //     x: centerInXAxis(imageBackgroundBase.current!, pathRef.current!),
      //     y: centerInYAxis(imageBackgroundBase.current!, pathRef.current!),
      //     scale: 1.4,
      //   }
      // );

      // tl.add(mainTextAnimation(developerRef.current, 1));

      tl.fromTo(
        allElementsMoveToBeInvisible,
        {
          x: centerInXAxis(yellowColorBase.current!, pathRef.current!) + width,
        },
        {
          x: centerInXAxis(yellowColorBase.current!, pathRef.current!) + width,
          duration: 2,
        }
      ).add(
        textSliderFromRightAnimation(
          clippathDMaskRef.current!,
          yellowColorBase.current!,
          pathRef.current!,
          0.9
        )
      );

      // .add(
      //   textSliderFromRightAnimation(
      //     bigDRef.current,
      //     yellowColorBase.current!,
      //     pathRef.current!,
      //     0.9
      //   )
      // )
      //   .add(textSliderFromRightAnimation(asRef.current, 0.8), "-=0.5")
      //   .add(mainTextAnimation(developerRef.current, 1.1), "-=0.5");
    });

    return () => ctx.revert();
  }, [width, height]);

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
      <div className="relative z-20 w-screen h-screen" ref={wholeSectionRef}>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___developer.jpg")`,
          }}
          ref={imageBackgroundBase}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundColor: `#FCEB41`,
            clipPath: "url(#d-mask)",
          }}
          ref={yellowColorBase}
        ></div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath id="d-mask" ref={clippathDMaskRef}>
            <path
              d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
              fill="#FCEB41"
              ref={pathRef}
            />
          </clipPath>
        </svg>

        {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
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
        </div> */}

        {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
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
        </div> */}

        {/* <div className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover">
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
        </div> */}

        {/* <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            clipPath: "url(#d-mask)",
          }}
          ref={imageBackgroundBase}
        ></div> */}

        {/* <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath id="d-mask" ref={clippathRef}>
            <path
              d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
              fill="#FCEB41"
              ref={pathRef}
            />
          </clipPath>
        </svg> */}

        {/* ------------------------------- */}

        {/* <svg
          height="100%"
          width="100%"
          className="absolute top-0 left-0 h-screen"
        >
          <defs>
            <mask id="test-mask" x="0" y="0" height="100%" width="100%">
              <rect x="0" y="0" height="100%" width="100%" />
              <path
                x="50%"
                y="50%"
                height="100%"
                width="100%"
                viewBox="0 0 310 364"
                xmlns="http://www.w3.org/2000/svg"
                textAnchor="middle"
                d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
                fill="#FCEB41"
              />
               <text x="50%" y="50%" fill="red" textAnchor="middle">
                I love SVG!
              </text> 
            </mask>
          </defs>
          <rect x="0" y="0" height="100%" width="100%" />
        </svg> */}

        {/* 
          <svg
            width="310"
            height="364"
            viewBox="0 0 310 364"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <clipPath
              id="d-mask"
              // className="absolute px-8 scale-[100%] -translate-x-1/2 -translate-y-1/2 md:scale-150 xl:scale-125 top-1/2 left-1/2 bottom-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
            >
              <path
                d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
                fill="#FCEB41"
                className="mx-auto"
              />
            </clipPath>
          </svg>
     */}

        {/* <svg
          width="321"
          height="189"
          viewBox="0 0 321 189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <clipPath id="d-mask">
            <path
              d="M0.0539975 185L77.878 3.23999H114.742L192.566 185H150.07L133.942 146.6H58.678L42.55 185H0.0539975ZM96.31 56.744L73.27 111.272H119.094L96.31 56.744ZM255.662 188.072C241.326 188.072 228.27 185.256 216.494 179.624C204.889 173.821 195.502 165.8 188.334 155.56L219.566 129.192C224.003 135.507 229.635 140.541 236.462 144.296C243.459 148.051 250.371 149.928 257.198 149.928C263.854 149.928 269.145 148.563 273.07 145.832C277.166 142.931 279.214 139.261 279.214 134.824C279.214 130.216 277.251 126.205 273.326 122.792C269.401 119.379 262.915 116.136 253.87 113.064L241.07 108.712C210.521 98.472 195.246 80.9787 195.246 56.232C195.246 38.9947 201.049 25.3413 212.654 15.272C224.43 5.20265 239.534 0.167984 257.966 0.167984C281.518 0.167984 301.059 8.53065 316.59 25.256L289.966 53.416C281.603 43.3467 271.107 38.312 258.478 38.312C252.505 38.312 247.299 39.5067 242.862 41.896C238.595 44.2853 236.462 47.6987 236.462 52.136C236.462 56.744 238.51 60.4987 242.606 63.4C246.702 66.1307 254.041 69.3733 264.622 73.128L277.422 77.736C306.435 88.1467 320.857 106.237 320.686 132.008C320.686 148.563 314.542 162.045 302.254 172.456C290.137 182.867 274.606 188.072 255.662 188.072Z"
              fill="#FCEB41"
            />
          </clipPath>
        </svg> */}
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
