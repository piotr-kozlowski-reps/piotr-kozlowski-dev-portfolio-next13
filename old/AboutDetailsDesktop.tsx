import Image from "next/image";
import React, { Fragment, useRef } from "react";
import useDeviceSize from "../hooks/useDeviceSize";
import { TDetailsInfoSet } from "../types/typings";
import AboutSlider from "../components/aboutPage/AboutSlider";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

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
    const ctx = gsap.context((self) => {
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
        .to(paragraphRef.current, {});
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
              <div className="pt-[48px] font-style-p" ref={paragraphRef}>
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
                    // addSliderElement={addSlidersHandler}
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
