import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";
import { TDetailsInfoSet } from "../../types/typings";
import { generatePropertiesForTimelineInEveryResolution } from "../../utils/animations";
import AboutSlider from "./AboutSlider";
import gsap, { Power4 } from "gsap";

type Props = {
  detailsInfoSet: TDetailsInfoSet;
};

const AboutDetailsDesktop = (props: Props) => {
  ////vars
  const { detailsInfoSet } = props;
  const {
    logoImageURL,
    clipPathName,
    sectionPurposeName,
    paragraphText,
    sliders,
    isFirstSectionThenNoTopMargin,
  } = detailsInfoSet;

  const [width, height, mediaSizeName] = useDeviceSize();

  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const graphsRef = useRef<HTMLDivElement>(null);

  const slidersRef = useRef<
    { element: React.RefObject<HTMLDivElement>; percentage: number }[]
  >([]);

  ////logic
  const addSlidersHandler = (elementInfo: {
    element: React.RefObject<HTMLDivElement>;
    percentage: number;
  }) => {
    slidersRef.current.push(elementInfo);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let aboutDetailsSectionTimeline: gsap.core.Timeline;
      let mm = gsap.matchMedia();

      const aboutDetailsSectionDesktopAnimation = (tl: gsap.core.Timeline) => {
        tl.addLabel("start")
          .fromTo(logoRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, "start")
          .fromTo(
            titleRef.current,
            { autoAlpha: 0, x: "-100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .fromTo(
            paragraphRef.current,
            { autoAlpha: 0, x: "-100vw" },
            { autoAlpha: 1, x: 0 },
            "start"
          )
          .addLabel("secondParagraph")
          .fromTo(
            graphsRef.current,
            { autoAlpha: 0, x: "100vw" },
            {
              autoAlpha: 1,
              x: 0,
            },
            "secondParagraph"
          )
          .add(() => {
            slidersRef.current.forEach((eachSlider, i) => {
              const tl = gsap.timeline();
              tl
                // .set(eachSlider.element.current, {
                //   scaleX: 0,
                //   autoAlpha: 0,
                // })
                .to(eachSlider.element.current, {
                  scaleX: eachSlider.percentage / 100,
                  autoAlpha: 1,
                });
              return tl;
            });
          })
          .to(paragraphRef.current, {});
      };

      mm.add("(min-width: 1224px)", () => {
        aboutDetailsSectionTimeline =
          generatePropertiesForTimelineInEveryResolution(204, sectionRef);
        aboutDetailsSectionDesktopAnimation(aboutDetailsSectionTimeline);
      });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <section title="aboutDetailsSection">
      <div
        className="flex items-start justify-between xl:w-[1220px] xl:mx-auto z-10 pb-8 bg-background_2_darker"
        ref={sectionRef}
      >
        <div
          className={`flex flex-col items-start justify-start ml-[40px] w-[570px]`}
        >
          <div className="relative w-[44px] h-[44px]" ref={logoRef}>
            <div className="absolute top-0 bottom-0 left-0 right-0 w-fill h-fill">
              <Image src={logoImageURL} alt="logo" width={128} height={128} />
            </div>
            <div
              className={`absolute top-0 bottom-0 left-0 right-0 w-fill h-fill bg-background_2_darker ${clipPathName}`}
            ></div>
          </div>
          <div className="mt-2 font-style-h3" ref={titleRef}>
            {sectionPurposeName}
          </div>
          <div className="relative w-full ">
            <div className="absolute w-full h-full">
              <div
                // className="mx-8 pt-[48px] text-center font-style-p invisible"
                className="pt-[48px] font-style-p"
                ref={paragraphRef}
              >
                <p>{paragraphText}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[570px] mr-[23px]">
          <div className="h-fill w-fill mt-[134px]">
            <div className="invisible font-style-p" ref={graphsRef}>
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    addSliderElement={addSlidersHandler}
                    mediaSizeName={mediaSizeName}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetailsDesktop;
