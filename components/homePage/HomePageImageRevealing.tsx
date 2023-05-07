import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { TMediaSizeNames } from "../../types/typings";

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

  //refs
  const wholeSectionRef = useRef<HTMLDivElement>(null);
  const imageStartingBackgroundColor = useRef<HTMLDivElement>(null);
  //refs - developer
  const imageBackgroundDeveloper = useRef<HTMLDivElement>(null);
  const imageBackgroundDeveloperNotMasked = useRef<HTMLDivElement>(null);
  const yellowFillDeveloperRef = useRef<HTMLDivElement>(null);
  const clippathDeveloperMaskRef = useRef<SVGClipPathElement>(null);
  const pathDeveloperRef = useRef<SVGPathElement>(null);
  //refs - designer
  const imageBackgroundDesigner = useRef<HTMLDivElement>(null);
  const imageBackgroundDesignerNotMasked = useRef<HTMLDivElement>(null);
  const yellowFillDesignerRef = useRef<HTMLDivElement>(null);
  const clippathDesignerMaskRef = useRef<SVGClipPathElement>(null);
  const pathDesignerRef = useRef<SVGPathElement>(null);
  //refs - human
  const imageBackgroundHuman = useRef<HTMLDivElement>(null);
  const imageBackgroundHumanNotMasked = useRef<HTMLDivElement>(null);
  const yellowFillHumanRef = useRef<HTMLDivElement>(null);
  const clippathHumanMaskRef = useRef<SVGClipPathElement>(null);
  const pathHumanRef = useRef<SVGPathElement>(null);

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
    const calculateScaleAccordingToScreenWidth = (
      width: number,
      mediaSizeName: TMediaSizeNames
    ) => {
      return mediaSizeName === "mobile"
        ? 0.85 + width / 20000
        : mediaSizeName === "tablet"
        ? 1.2 + width / 2000
        : 1.35 + width / 2000;
    };

    //context
    const ctx = gsap.context(() => {
      //tl makers
      /** durationMultiplier: number => 1 is no change, every duration is multiplied by this factor */
      function textSliderFromRightAnimation(
        clipPath: SVGClipPathElement,
        imageBase: HTMLDivElement,
        path: SVGPathElement,
        durationMultiplier: number
      ) {
        const tlTextSliderFromRight = gsap.timeline();
        tl.addLabel("start")
          .fromTo(
            clipPath,
            {
              x: centerInXAxis(imageBase, path) + 1.5 * width,
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              transformOrigin: "50% 50%",
              opacity: 0,
              filter: "blur(20px)",
            },
            {
              x: centerInXAxis(imageBase, path),
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            },
            "start"
          )
          .fromTo(
            imageBase,
            {
              opacity: 0,
            },
            {
              opacity: 1,

              duration: 0.5 * durationMultiplier,
              ease: "expo",
            },
            "start"
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
              x: centerInXAxis(imageBase, path) - 1.5 * width,
              filter: "blur(30px)",
              autoAlpha: 0,
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            }
          );

        return tlTextSliderFromRight;
      }
      function mainTextAnimation(
        clipPath: SVGClipPathElement,
        imageBase: HTMLDivElement,
        path: SVGPathElement,
        durationMultiplier: number
      ) {
        const tl = gsap.timeline();
        tl.addLabel("start")
          .fromTo(
            clipPath,
            {
              x: centerInXAxis(imageBase, path) + 1.5 * width,
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              transformOrigin: "50% 50%",
              opacity: 0,
              filter: "blur(20px)",
            },
            {
              x: centerInXAxis(imageBase, path),
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.5 * durationMultiplier,
              ease: "expo",
            },
            "start"
          )
          .to(clipPath, {
            duration: 3 * durationMultiplier,
            scaleY:
              calculateScaleAccordingToScreenWidth(width, mediaSizeName) + 0.1,
            scale:
              calculateScaleAccordingToScreenWidth(width, mediaSizeName) + 0.1,
            ease: "back",
          })
          .addLabel("end")
          .to(clipPath, {
            autoAlpha: 0,
            filter: "blur(3px)",
            scale: 50,
            duration: 1 * durationMultiplier,
            ease: "slow",
          })
          .to(
            imageBase,
            { opacity: 0, autoAlpha: 0, duration: 1 * durationMultiplier },
            "end"
          );

        return tl;
      }
      /** fillAmount: number ->  form 0 to 1 */
      function mainTextAnimationWithFinalImageFullySeen(
        clipPath: SVGClipPathElement,
        imageBase: HTMLDivElement,
        path: SVGPathElement,
        fill: HTMLDivElement,
        imageBaseWithNoMask: HTMLDivElement,
        /** number form 0 to 1 */
        fillAmount: number,
        durationMultiplier: number
      ) {
        const tl = gsap.timeline();
        tl.addLabel("start")
          .fromTo(
            clipPath,
            {
              x: centerInXAxis(imageBase, path) + 1.5 * width,
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              transformOrigin: "50% 50%",
              opacity: 0,
              filter: "blur(20px)",
            },
            {
              x: centerInXAxis(imageBase, path),
              y: centerInYAxis(imageBase, path),
              scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.3 * durationMultiplier,
              ease: "expo",
            },
            "start"
          )
          .fromTo(
            fill,
            { autoAlpha: 0 },
            {
              autoAlpha: fillAmount,
              duration: 0.7 * durationMultiplier,
              ease: "slow",
            },
            "start"
          )
          .to(clipPath, {
            duration: 3 * durationMultiplier,
            scaleY:
              calculateScaleAccordingToScreenWidth(width, mediaSizeName) + 0.1,
            scale:
              calculateScaleAccordingToScreenWidth(width, mediaSizeName) + 0.1,
            ease: "back",
          })
          .addLabel("end")
          .to(
            clipPath,
            {
              filter: "blur(3px)",
              scale:
                mediaSizeName === "mobile"
                  ? 160
                  : mediaSizeName === "tablet"
                  ? 300
                  : 500,
              transformOrigin: "2% 50%",
              duration: 3 * durationMultiplier,
              ease: "slow",
            },
            "end"
          )
          .fromTo(
            fill,
            { autoAlpha: fillAmount },
            { autoAlpha: 0, duration: 1 * durationMultiplier, ease: "slow" },
            "end"
          )
          .fromTo(
            imageBaseWithNoMask,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.2 }
          );

        return tl;
      }
      function moveBackMaskOutOfScreen(
        clipPath: SVGClipPathElement,
        imageBase: HTMLDivElement,
        path: SVGPathElement
      ) {
        const tl = gsap.timeline();
        tl.fromTo(
          clipPath,
          {
            x: centerInXAxis(imageBase, path),
            y: centerInYAxis(imageBase, path),
            scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
            transformOrigin: "50% 50%",
            opacity: 1,
            filter: "blur(20px)",
          },
          {
            x: centerInXAxis(imageBase, path) + 1.5 * width,
            y: centerInYAxis(imageBase, path),
            scale: calculateScaleAccordingToScreenWidth(width, mediaSizeName),
            opacity: 0,
            duration: 0.1,
          }
        );

        return tl;
      }
      function makePause(
        elements: SVGClipPathElement[],
        imageBase: HTMLDivElement,
        path: SVGPathElement,
        duration: number
      ) {
        const tl = gsap.timeline();

        tl.fromTo(
          elements,
          {
            x: centerInXAxis(imageBase, path) + 1.5 * width,
          },
          {
            x: centerInXAxis(imageBase, path) + 1.5 * width,
            duration: duration,
          }
        );

        return tl;
      }
      function hideElement(
        element: HTMLDivElement | HTMLDivElement[],
        duration: number
      ) {
        const tl = gsap.timeline();

        tl.fromTo(
          element,
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
            duration: duration,
          }
        );

        return tl;
      }

      //main timeline arrays
      const allElementsMoveToBeInvisible: SVGClipPathElement[] = [
        clippathDeveloperMaskRef.current!,
        clippathDesignerMaskRef.current!,
        clippathHumanMaskRef.current!,
      ];

      const allBackgroundImages = [
        imageBackgroundHuman.current!,
        imageBackgroundHumanNotMasked.current!,
        imageBackgroundDeveloper.current!,
        imageBackgroundDeveloperNotMasked.current!,
        imageBackgroundDesigner.current!,
        imageBackgroundDesignerNotMasked.current!,
      ];

      //main Timeline
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.add(
        hideElement(
          [
            imageBackgroundDeveloperNotMasked.current!,
            imageBackgroundDesignerNotMasked.current!,
          ],
          0.0001
        )
      )
        .add(
          makePause(
            allElementsMoveToBeInvisible,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!,
            0.2
          )
        )
        .add(
          mainTextAnimationWithFinalImageFullySeen(
            clippathDeveloperMaskRef.current!,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!,
            yellowFillDeveloperRef.current!,
            imageBackgroundDeveloperNotMasked.current!,
            0.2,
            0.9 //0.9
          )
        )
        .add(
          makePause(
            allElementsMoveToBeInvisible,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!,
            1.4 //1.4
          )
        )
        .add(
          mainTextAnimationWithFinalImageFullySeen(
            clippathDesignerMaskRef.current!,
            imageBackgroundDesigner.current!,
            pathDesignerRef.current!,
            yellowFillDesignerRef.current!,
            imageBackgroundDesignerNotMasked.current!,
            0.1,
            0.9 //0.9
          )
        )
        .add(
          moveBackMaskOutOfScreen(
            clippathDeveloperMaskRef.current!,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!
          )
        )
        .add(hideElement(imageBackgroundDeveloperNotMasked.current!, 0.1))
        .add(
          makePause(
            allElementsMoveToBeInvisible,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!,
            0.1
          )
        )
        .add(
          mainTextAnimationWithFinalImageFullySeen(
            clippathHumanMaskRef.current!,
            imageBackgroundHuman.current!,
            pathHumanRef.current!,
            yellowFillHumanRef.current!,
            imageBackgroundHumanNotMasked.current!,
            0,
            0.9 //0.9
          )
        )
        .add(
          moveBackMaskOutOfScreen(
            clippathDesignerMaskRef.current!,
            imageBackgroundDesigner.current!,
            pathDesignerRef.current!
          )
        )
        .add(hideElement(imageBackgroundDesignerNotMasked.current!, 0.1))
        .add(
          makePause(
            allElementsMoveToBeInvisible,
            imageBackgroundDeveloper.current!,
            pathDeveloperRef.current!,
            0.9
          )
        )
        .add(
          moveBackMaskOutOfScreen(
            clippathHumanMaskRef.current!,
            imageBackgroundHuman.current!,
            pathHumanRef.current!
          )
        )
        .to(allBackgroundImages, {
          autoAlpha: 0,
          duration: 0.5,
        });
    });

    return () => ctx.revert();
  }, [width, height]);

  ////jsx
  return (
    <Fragment>
      <div className="relative z-20 w-screen h-screen" ref={wholeSectionRef}>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          ref={imageStartingBackgroundColor}
        ></div>

        {/* developer */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___developer.jpg")`,
            clipPath: "url(#developer-mask)",
          }}
          ref={imageBackgroundDeveloper}
        >
          <div
            className="w-screen h-screen bg-main_color opacity-5"
            ref={yellowFillDeveloperRef}
          ></div>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath
            id="developer-mask"
            ref={clippathDeveloperMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.131253 47V1.56H15.6193C22.0193 1.56 27.4806 3.77866 32.0033 8.216C36.5259 12.6533 38.7873 18.008 38.7873 24.28C38.7873 30.552 36.5259 35.9067 32.0033 40.344C27.4806 44.7813 22.0193 47 15.6193 47H0.131253ZM10.3073 37.656H15.6193C19.3739 37.656 22.4459 36.376 24.8353 33.816C27.2673 31.2133 28.4833 28.0347 28.4833 24.28C28.4833 20.5253 27.2673 17.368 24.8353 14.808C22.4459 12.2053 19.3739 10.904 15.6193 10.904H10.3073V37.656ZM42.6813 47V1.56H71.4813V11.288H52.8573V19.416H67.6413V29.144H52.8573V37.272H71.4813V47H42.6813ZM89.9318 47L71.3078 1.56H82.3798L94.4758 31.832L106.508 1.56H117.708L99.0838 47H89.9318ZM119.344 47V1.56H148.144V11.288H129.52V19.416H144.304V29.144H129.52V37.272H148.144V47H119.344ZM152.706 47V1.56H162.882V37.272H181.698V47H152.706ZM194.276 33.88C196.879 36.568 200.015 37.912 203.684 37.912C207.354 37.912 210.468 36.568 213.028 33.88C215.588 31.192 216.868 27.992 216.868 24.28C216.868 20.568 215.588 17.368 213.028 14.68C210.468 11.992 207.354 10.648 203.684 10.648C200.015 10.648 196.879 11.992 194.276 14.68C191.716 17.368 190.436 20.568 190.436 24.28C190.436 27.992 191.716 31.192 194.276 33.88ZM220.26 40.856C215.695 45.464 210.17 47.768 203.684 47.768C197.199 47.768 191.652 45.4853 187.044 40.92C182.479 36.312 180.196 30.7653 180.196 24.28C180.196 17.7947 182.479 12.2693 187.044 7.704C191.652 3.096 197.199 0.791996 203.684 0.791996C210.17 0.791996 215.695 3.096 220.26 7.704C224.868 12.312 227.172 17.8373 227.172 24.28C227.172 30.7227 224.868 36.248 220.26 40.856ZM257.81 6.04C260.882 9.02666 262.418 12.7173 262.418 17.112C262.418 21.5067 260.882 25.1973 257.81 28.184C254.78 31.128 250.983 32.6 246.418 32.6H241.17V47H230.994V1.56H246.418C250.983 1.56 254.78 3.05333 257.81 6.04ZM252.562 17.112C252.562 15.4053 251.964 13.9973 250.77 12.888C249.618 11.736 248.124 11.16 246.29 11.16H241.17V23.064H246.29C248.082 23.064 249.575 22.488 250.77 21.336C251.964 20.184 252.562 18.776 252.562 17.112ZM265.731 47V1.56H294.531V11.288H275.907V19.416H290.691V29.144H275.907V37.272H294.531V47H265.731ZM299.094 47V1.56H317.014C321.195 1.56 324.587 2.88266 327.19 5.528C329.792 8.17333 331.094 11.416 331.094 15.256C331.094 20.9733 328.128 24.8773 322.198 26.968L338.262 47H326.038L310.87 28.248H309.27V47H299.094ZM309.27 19.608H315.798C317.334 19.608 318.571 19.2027 319.51 18.392C320.491 17.5813 320.982 16.536 320.982 15.256C320.982 13.8907 320.491 12.824 319.51 12.056C318.571 11.288 317.334 10.904 315.798 10.904H309.27V19.608Z"
              ref={pathDeveloperRef}
            />
          </clipPath>
        </svg>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 invisible h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___developer.jpg")`,
          }}
          ref={imageBackgroundDeveloperNotMasked}
        ></div>

        {/* designer*/}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover shadow-input-shadow"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            clipPath: "url(#designer-mask)",
          }}
          ref={imageBackgroundDesigner}
        >
          <div
            className="w-screen h-screen opacity-0 bg-main_color"
            ref={yellowFillDesignerRef}
          ></div>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath
            id="designer-mask"
            ref={clippathDesignerMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.812497 47V1.56H16.3005C22.7005 1.56 28.1618 3.77866 32.6845 8.216C37.2072 12.6533 39.4685 18.008 39.4685 24.28C39.4685 30.552 37.2072 35.9067 32.6845 40.344C28.1618 44.7813 22.7005 47 16.3005 47H0.812497ZM10.9885 37.656H16.3005C20.0552 37.656 23.1272 36.376 25.5165 33.816C27.9485 31.2133 29.1645 28.0347 29.1645 24.28C29.1645 20.5253 27.9485 17.368 25.5165 14.808C23.1272 12.2053 20.0552 10.904 16.3005 10.904H10.9885V37.656ZM43.3625 47V1.56H72.1625V11.288H53.5385V19.416H68.3225V29.144H53.5385V37.272H72.1625V47H43.3625ZM90.293 47.768C86.709 47.768 83.445 47.064 80.501 45.656C77.5997 44.2053 75.253 42.2 73.461 39.64L81.269 33.048C82.3783 34.6267 83.7863 35.8853 85.493 36.824C87.2423 37.7627 88.9703 38.232 90.677 38.232C92.341 38.232 93.6637 37.8907 94.645 37.208C95.669 36.4827 96.181 35.5653 96.181 34.456C96.181 33.304 95.6903 32.3013 94.709 31.448C93.7277 30.5947 92.1063 29.784 89.845 29.016L86.645 27.928C79.0077 25.368 75.189 20.9947 75.189 14.808C75.189 10.4987 76.6397 7.08533 79.541 4.568C82.485 2.05066 86.261 0.791996 90.869 0.791996C96.757 0.791996 101.642 2.88266 105.525 7.064L98.869 14.104C96.7783 11.5867 94.1543 10.328 90.997 10.328C89.5037 10.328 88.2023 10.6267 87.093 11.224C86.0263 11.8213 85.493 12.6747 85.493 13.784C85.493 14.936 86.005 15.8747 87.029 16.6C88.053 17.2827 89.8877 18.0933 92.533 19.032L95.733 20.184C102.986 22.7867 106.592 27.3093 106.549 33.752C106.549 37.8907 105.013 41.2613 101.941 43.864C98.9117 46.4667 95.029 47.768 90.293 47.768ZM110.4 47V1.56H120.576V47H110.4ZM149.158 47.768C142.118 47.768 136.23 45.528 131.494 41.048C126.801 36.5253 124.454 30.936 124.454 24.28C124.454 17.7093 126.694 12.1627 131.174 7.64C135.697 3.07466 141.435 0.791996 148.39 0.791996C156.198 0.791996 162.406 3.37333 167.014 8.536L159.846 15.512C156.817 12.2693 152.998 10.648 148.39 10.648C144.379 10.648 141.094 11.992 138.534 14.68C135.974 17.3253 134.694 20.5253 134.694 24.28C134.694 28.2053 135.995 31.4693 138.598 34.072C141.201 36.632 144.678 37.912 149.03 37.912C153.041 37.912 155.985 37.1867 157.862 35.736V29.016H148.966V19.48H167.782V41.048C165.819 43.2667 163.195 44.952 159.91 46.104C156.625 47.2133 153.041 47.768 149.158 47.768ZM213.65 47H204.882L182.738 18.904V47H172.562V1.56H181.33L203.41 29.656V1.56H213.65V47ZM220.05 47V1.56H248.85V11.288H230.226V19.416H245.01V29.144H230.226V37.272H248.85V47H220.05ZM253.413 47V1.56H271.333C275.514 1.56 278.906 2.88266 281.509 5.528C284.111 8.17333 285.413 11.416 285.413 15.256C285.413 20.9733 282.447 24.8773 276.517 26.968L292.581 47H280.357L265.189 28.248H263.589V47H253.413ZM263.589 19.608H270.117C271.653 19.608 272.89 19.2027 273.829 18.392C274.81 17.5813 275.301 16.536 275.301 15.256C275.301 13.8907 274.81 12.824 273.829 12.056C272.89 11.288 271.653 10.904 270.117 10.904H263.589V19.608Z"
              ref={pathDesignerRef}
            />
          </clipPath>
        </svg>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            opacity: 0,
          }}
          ref={imageBackgroundDesignerNotMasked}
        ></div>

        {/* human */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page.jpg")`,
            clipPath: "url(#human-mask)",
          }}
          ref={imageBackgroundHuman}
        >
          <div
            className="w-screen h-screen opacity-0 bg-main_color"
            ref={yellowFillHumanRef}
          ></div>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath
            id="human-mask"
            ref={clippathHumanMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.101563 57V0.199997H12.8216V22.44H35.7016V0.199997H48.4216V57H35.7016V34.52H12.8216V57H0.101563ZM95.9341 51.56C91.6141 55.8267 86.0141 57.96 79.1341 57.96C72.2541 57.96 66.6274 55.8267 62.2541 51.56C57.9341 47.24 55.7741 41.56 55.7741 34.52V0.199997H68.4941V34.68C68.4941 38.04 69.4541 40.7067 71.3741 42.68C73.3474 44.6533 75.9341 45.64 79.1341 45.64C82.3341 45.64 84.8941 44.6533 86.8141 42.68C88.7874 40.7067 89.7741 38.04 89.7741 34.68V0.199997H102.494V34.52C102.494 41.56 100.307 47.24 95.9341 51.56ZM109.836 0.199997H121.436L139.116 24.68L156.956 0.199997H168.556V57H155.756V22.04L139.196 44.92L122.556 21.96V57H109.836V0.199997ZM170.459 57L194.779 0.199997H206.299L230.619 57H217.339L212.299 45H188.779L183.739 57H170.459ZM200.539 16.92L193.339 33.96H207.659L200.539 16.92ZM283.899 57H272.939L245.259 21.88V57H232.539V0.199997H243.499L271.099 35.32V0.199997H283.899V57Z"
              ref={pathHumanRef}
            />
          </clipPath>
        </svg>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 invisible h-screen bg-center bg-no-repeat bg-cover opacity-0"
          style={{
            backgroundImage: `url("/bg-landing-page.jpg")`,
          }}
          ref={imageBackgroundHumanNotMasked}
        ></div>

        {/* ---------------------------------- */}
        {/* ---------------------------------- */}
        {/* ---------------------------------- */}
        {/* section animation with yellow background - for developer */}
        {/* <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundColor: `#FCEB41`,
            clipPath: "url(#d-mask-developer)",
          }}
          ref={yellowColorBaseForD}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundColor: `#FCEB41`,
            clipPath: "url(#as-mask)",
          }}
          ref={yellowColorBaseForAS}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundColor: `#FCEB41`,
            clipPath: "url(#developer-mask)",
          }}
          ref={yellowColorBaseForDeveloper}
        ></div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath
            id="d-mask-developer"
            ref={clippathDMaskForDeveloperRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
              fill="#FCEB41"
              ref={pathDDeveloperRef}
            />
          </clipPath>
          <clipPath
            id="as-mask"
            ref={clippathASMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.0539975 185L77.878 3.23999H114.742L192.566 185H150.07L133.942 146.6H58.678L42.55 185H0.0539975ZM96.31 56.744L73.27 111.272H119.094L96.31 56.744ZM255.662 188.072C241.326 188.072 228.27 185.256 216.494 179.624C204.889 173.821 195.502 165.8 188.334 155.56L219.566 129.192C224.003 135.507 229.635 140.541 236.462 144.296C243.459 148.051 250.371 149.928 257.198 149.928C263.854 149.928 269.145 148.563 273.07 145.832C277.166 142.931 279.214 139.261 279.214 134.824C279.214 130.216 277.251 126.205 273.326 122.792C269.401 119.379 262.915 116.136 253.87 113.064L241.07 108.712C210.521 98.472 195.246 80.9787 195.246 56.232C195.246 38.9947 201.049 25.3413 212.654 15.272C224.43 5.20265 239.534 0.167984 257.966 0.167984C281.518 0.167984 301.059 8.53065 316.59 25.256L289.966 53.416C281.603 43.3467 271.107 38.312 258.478 38.312C252.505 38.312 247.299 39.5067 242.862 41.896C238.595 44.2853 236.462 47.6987 236.462 52.136C236.462 56.744 238.51 60.4987 242.606 63.4C246.702 66.1307 254.041 69.3733 264.622 73.128L277.422 77.736C306.435 88.1467 320.857 106.237 320.686 132.008C320.686 148.563 314.542 162.045 302.254 172.456C290.137 182.867 274.606 188.072 255.662 188.072Z"
              ref={pathASRef}
            />
          </clipPath>
          <clipPath
            id="developer-mask"
            ref={clippathDeveloperMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.131253 47V1.56H15.6193C22.0193 1.56 27.4806 3.77866 32.0033 8.216C36.5259 12.6533 38.7873 18.008 38.7873 24.28C38.7873 30.552 36.5259 35.9067 32.0033 40.344C27.4806 44.7813 22.0193 47 15.6193 47H0.131253ZM10.3073 37.656H15.6193C19.3739 37.656 22.4459 36.376 24.8353 33.816C27.2673 31.2133 28.4833 28.0347 28.4833 24.28C28.4833 20.5253 27.2673 17.368 24.8353 14.808C22.4459 12.2053 19.3739 10.904 15.6193 10.904H10.3073V37.656ZM42.6813 47V1.56H71.4813V11.288H52.8573V19.416H67.6413V29.144H52.8573V37.272H71.4813V47H42.6813ZM89.9318 47L71.3078 1.56H82.3798L94.4758 31.832L106.508 1.56H117.708L99.0838 47H89.9318ZM119.344 47V1.56H148.144V11.288H129.52V19.416H144.304V29.144H129.52V37.272H148.144V47H119.344ZM152.706 47V1.56H162.882V37.272H181.698V47H152.706ZM194.276 33.88C196.879 36.568 200.015 37.912 203.684 37.912C207.354 37.912 210.468 36.568 213.028 33.88C215.588 31.192 216.868 27.992 216.868 24.28C216.868 20.568 215.588 17.368 213.028 14.68C210.468 11.992 207.354 10.648 203.684 10.648C200.015 10.648 196.879 11.992 194.276 14.68C191.716 17.368 190.436 20.568 190.436 24.28C190.436 27.992 191.716 31.192 194.276 33.88ZM220.26 40.856C215.695 45.464 210.17 47.768 203.684 47.768C197.199 47.768 191.652 45.4853 187.044 40.92C182.479 36.312 180.196 30.7653 180.196 24.28C180.196 17.7947 182.479 12.2693 187.044 7.704C191.652 3.096 197.199 0.791996 203.684 0.791996C210.17 0.791996 215.695 3.096 220.26 7.704C224.868 12.312 227.172 17.8373 227.172 24.28C227.172 30.7227 224.868 36.248 220.26 40.856ZM257.81 6.04C260.882 9.02666 262.418 12.7173 262.418 17.112C262.418 21.5067 260.882 25.1973 257.81 28.184C254.78 31.128 250.983 32.6 246.418 32.6H241.17V47H230.994V1.56H246.418C250.983 1.56 254.78 3.05333 257.81 6.04ZM252.562 17.112C252.562 15.4053 251.964 13.9973 250.77 12.888C249.618 11.736 248.124 11.16 246.29 11.16H241.17V23.064H246.29C248.082 23.064 249.575 22.488 250.77 21.336C251.964 20.184 252.562 18.776 252.562 17.112ZM265.731 47V1.56H294.531V11.288H275.907V19.416H290.691V29.144H275.907V37.272H294.531V47H265.731ZM299.094 47V1.56H317.014C321.195 1.56 324.587 2.88266 327.19 5.528C329.792 8.17333 331.094 11.416 331.094 15.256C331.094 20.9733 328.128 24.8773 322.198 26.968L338.262 47H326.038L310.87 28.248H309.27V47H299.094ZM309.27 19.608H315.798C317.334 19.608 318.571 19.2027 319.51 18.392C320.491 17.5813 320.982 16.536 320.982 15.256C320.982 13.8907 320.491 12.824 319.51 12.056C318.571 11.288 317.334 10.904 315.798 10.904H309.27V19.608Z"
              ref={pathDeveloperRef}
            />
          </clipPath>
        </svg> */}

        {/* section animation with designer image background - for designer */}
        {/* <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            clipPath: "url(#d-mask-designer)",
          }}
          ref={designerBaseForD}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            clipPath: "url(#as-mask-designer)",
          }}
          ref={designerBaseForAs}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-20 h-screen bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url("/bg-landing-page___designer.jpg")`,
            clipPath: "url(#designer-mask)",
          }}
          ref={designerBaseForDesigner}
        ></div> */}

        {/* <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 h-screen"
        >
          <clipPath
            id="d-mask-designer"
            ref={clippathDMaskForDesignerRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.400002 364V0.47998H124.304C175.504 0.47998 219.195 18.2293 255.376 53.728C291.557 89.2267 309.648 132.064 309.648 182.24C309.648 232.416 291.557 275.253 255.376 310.752C219.195 346.251 175.504 364 124.304 364H0.400002ZM81.808 289.248H124.304C154.341 289.248 178.917 279.008 198.032 258.528C217.488 237.707 227.216 212.277 227.216 182.24C227.216 152.203 217.488 126.944 198.032 106.464C178.917 85.6427 154.341 75.232 124.304 75.232H81.808V289.248Z"
              fill="#FCEB41"
              ref={pathDDesignerRef}
            />
          </clipPath>
          <clipPath
            id="as-mask-designer"
            ref={clippathAsMaskForDesignerRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.0539975 185L77.878 3.23999H114.742L192.566 185H150.07L133.942 146.6H58.678L42.55 185H0.0539975ZM96.31 56.744L73.27 111.272H119.094L96.31 56.744ZM255.662 188.072C241.326 188.072 228.27 185.256 216.494 179.624C204.889 173.821 195.502 165.8 188.334 155.56L219.566 129.192C224.003 135.507 229.635 140.541 236.462 144.296C243.459 148.051 250.371 149.928 257.198 149.928C263.854 149.928 269.145 148.563 273.07 145.832C277.166 142.931 279.214 139.261 279.214 134.824C279.214 130.216 277.251 126.205 273.326 122.792C269.401 119.379 262.915 116.136 253.87 113.064L241.07 108.712C210.521 98.472 195.246 80.9787 195.246 56.232C195.246 38.9947 201.049 25.3413 212.654 15.272C224.43 5.20265 239.534 0.167984 257.966 0.167984C281.518 0.167984 301.059 8.53065 316.59 25.256L289.966 53.416C281.603 43.3467 271.107 38.312 258.478 38.312C252.505 38.312 247.299 39.5067 242.862 41.896C238.595 44.2853 236.462 47.6987 236.462 52.136C236.462 56.744 238.51 60.4987 242.606 63.4C246.702 66.1307 254.041 69.3733 264.622 73.128L277.422 77.736C306.435 88.1467 320.857 106.237 320.686 132.008C320.686 148.563 314.542 162.045 302.254 172.456C290.137 182.867 274.606 188.072 255.662 188.072Z"
              ref={pathAsDesignerRef}
            />
          </clipPath>
          <clipPath
            id="designer-mask"
            ref={clippathDesignerMaskRef}
            className="absolute top-0 left-0 h-screen"
          >
            <path
              d="M0.812497 47V1.56H16.3005C22.7005 1.56 28.1618 3.77866 32.6845 8.216C37.2072 12.6533 39.4685 18.008 39.4685 24.28C39.4685 30.552 37.2072 35.9067 32.6845 40.344C28.1618 44.7813 22.7005 47 16.3005 47H0.812497ZM10.9885 37.656H16.3005C20.0552 37.656 23.1272 36.376 25.5165 33.816C27.9485 31.2133 29.1645 28.0347 29.1645 24.28C29.1645 20.5253 27.9485 17.368 25.5165 14.808C23.1272 12.2053 20.0552 10.904 16.3005 10.904H10.9885V37.656ZM43.3625 47V1.56H72.1625V11.288H53.5385V19.416H68.3225V29.144H53.5385V37.272H72.1625V47H43.3625ZM90.293 47.768C86.709 47.768 83.445 47.064 80.501 45.656C77.5997 44.2053 75.253 42.2 73.461 39.64L81.269 33.048C82.3783 34.6267 83.7863 35.8853 85.493 36.824C87.2423 37.7627 88.9703 38.232 90.677 38.232C92.341 38.232 93.6637 37.8907 94.645 37.208C95.669 36.4827 96.181 35.5653 96.181 34.456C96.181 33.304 95.6903 32.3013 94.709 31.448C93.7277 30.5947 92.1063 29.784 89.845 29.016L86.645 27.928C79.0077 25.368 75.189 20.9947 75.189 14.808C75.189 10.4987 76.6397 7.08533 79.541 4.568C82.485 2.05066 86.261 0.791996 90.869 0.791996C96.757 0.791996 101.642 2.88266 105.525 7.064L98.869 14.104C96.7783 11.5867 94.1543 10.328 90.997 10.328C89.5037 10.328 88.2023 10.6267 87.093 11.224C86.0263 11.8213 85.493 12.6747 85.493 13.784C85.493 14.936 86.005 15.8747 87.029 16.6C88.053 17.2827 89.8877 18.0933 92.533 19.032L95.733 20.184C102.986 22.7867 106.592 27.3093 106.549 33.752C106.549 37.8907 105.013 41.2613 101.941 43.864C98.9117 46.4667 95.029 47.768 90.293 47.768ZM110.4 47V1.56H120.576V47H110.4ZM149.158 47.768C142.118 47.768 136.23 45.528 131.494 41.048C126.801 36.5253 124.454 30.936 124.454 24.28C124.454 17.7093 126.694 12.1627 131.174 7.64C135.697 3.07466 141.435 0.791996 148.39 0.791996C156.198 0.791996 162.406 3.37333 167.014 8.536L159.846 15.512C156.817 12.2693 152.998 10.648 148.39 10.648C144.379 10.648 141.094 11.992 138.534 14.68C135.974 17.3253 134.694 20.5253 134.694 24.28C134.694 28.2053 135.995 31.4693 138.598 34.072C141.201 36.632 144.678 37.912 149.03 37.912C153.041 37.912 155.985 37.1867 157.862 35.736V29.016H148.966V19.48H167.782V41.048C165.819 43.2667 163.195 44.952 159.91 46.104C156.625 47.2133 153.041 47.768 149.158 47.768ZM213.65 47H204.882L182.738 18.904V47H172.562V1.56H181.33L203.41 29.656V1.56H213.65V47ZM220.05 47V1.56H248.85V11.288H230.226V19.416H245.01V29.144H230.226V37.272H248.85V47H220.05ZM253.413 47V1.56H271.333C275.514 1.56 278.906 2.88266 281.509 5.528C284.111 8.17333 285.413 11.416 285.413 15.256C285.413 20.9733 282.447 24.8773 276.517 26.968L292.581 47H280.357L265.189 28.248H263.589V47H253.413ZM263.589 19.608H270.117C271.653 19.608 272.89 19.2027 273.829 18.392C274.81 17.5813 275.301 16.536 275.301 15.256C275.301 13.8907 274.81 12.824 273.829 12.056C272.89 11.288 271.653 10.904 270.117 10.904H263.589V19.608Z"
              ref={pathDesignerRef}
            />
          </clipPath>
        </svg> */}

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
