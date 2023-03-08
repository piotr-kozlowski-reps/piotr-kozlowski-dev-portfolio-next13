import Image from "next/image";
import React, { Fragment, useRef } from "react";
import useDeviceSize from "../hooks/useDeviceSize";
import { TDetailsInfoSet } from "../types/typings";
import { generatePropertiesForTimelineInEveryResolution } from "../utils/animations";
import AboutSlider from "../components/aboutPage/AboutSlider";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

type Props = {
  detailsInfoSet: TDetailsInfoSet;
};

const AboutDetailsMobileAndTablet = (props: Props) => {
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

  ////animation
  useIsomorphicLayoutEffect(() => {
    let mm = gsap.matchMedia();

    const aboutDetailsSectionAnimation = (
      tl: gsap.core.Timeline,
      self: gsap.Context
    ) => {
      tl.addLabel("start")
        .fromTo(logoRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, "start")
        .fromTo(
          titleRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .fromTo(
          paragraphRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0 },
          "start"
        )
        .to(paragraphRef.current, {})
        .addLabel("secondParagraph")
        .fromTo(
          paragraphRef.current,
          { autoAlpha: 1, x: 0 },
          { autoAlpha: 0, x: "-100vw" },
          "secondParagraph"
        )
        .fromTo(
          graphsRef.current,
          { autoAlpha: 0, x: "100vw" },
          {
            autoAlpha: 1,
            x: 0,
          },
          "secondParagraph"
        )
        // .call(() => {
        //   slidersRef.current.forEach((eachSlider, i) => {
        //     self.add(() => {
        //       gsap.to(eachSlider.element.current, {
        //         scaleX: eachSlider.percentage / 100,
        //         autoAlpha: 1,
        //       });
        //     });
        //   });
        // })
        // .call(() => {
        //   self.add(() => {
        //     slidersRef.current.forEach((eachSlider, i) => {
        //       return gsap.to(eachSlider.element.current, {
        //         scaleX: eachSlider.percentage / 100,
        //         autoAlpha: 1,
        //       });
        //     });
        //   });
        // })
        // .self.add(
        //   slidersRef.current.forEach((eachSlider, i) => {
        //     gsap.to(eachSlider.element.current, {
        //       scaleX: eachSlider.percentage / 100,
        //       autoAlpha: 1,
        //     });
        //   })
        // )
        .to(paragraphRef.current, {})
        .addLabel("fadeOut")
        .to(graphsRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(titleRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut")
        .to(logoRef.current, { autoAlpha: 0, y: "-100vw" }, "fadeOut");
    };

    mm.add("(max-width: 768px)", (self) => {
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top 172px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      //animation
      aboutDetailsSectionAnimation(tl, self);
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", (self) => {
      //tl
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top 204px`,
          end: () => `+=350%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      //animation
      aboutDetailsSectionAnimation(tl, self);
    });

    return () => mm.revert();
  }, []);

  ////jsx
  return (
    <section title="aboutDetailsSection">
      <div
        className={`flex flex-col items-center justify-center ${
          isFirstSectionThenNoTopMargin ? "" : "mt-[100%]"
        }`}
        ref={sectionRef}
      >
        <div
          className={`relative ${
            mediaSizeName === "mobile"
              ? "w-[44px] h-[44px]"
              : "w-[88px] h-[88px]"
          } `}
          ref={logoRef}
        >
          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
            ref={logoRef}
          >
            <Image src={logoImageURL} alt="logo" width={128} height={128} />
          </div>
          <div
            className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-background_2_darker ${clipPathName}`}
          ></div>
        </div>
        <div className="invisible mt-2 font-style-h3" ref={titleRef}>
          {sectionPurposeName}
        </div>
        <div className="relative w-full md:w-[566px]">
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={paragraphRef}
            >
              <p>{paragraphText}</p>
            </div>
          </div>
          <div className="absolute w-full h-full">
            <div
              className="mx-8 pt-[48px] text-center font-style-p invisible"
              ref={graphsRef}
            >
              {sliders.map((slider, index) => (
                <Fragment key={index}>
                  <AboutSlider
                    sliderData={slider}
                    // addSliderElement={addSlidersHandler}
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

export default AboutDetailsMobileAndTablet;
