import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import {
  TCredentialsInfoSet,
  TTimelineFunctionsToBeNested,
} from "../../types/typings";
import CredentialItem from "./CredentialItem";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const AboutCredentials = () => {
  ////vars
  const [timelineFunctionsToBeNested, setTimelineFunctionsToBeNested] =
    useState<TTimelineFunctionsToBeNested[]>();

  const credentialItemsSectionRef = useRef<HTMLDivElement>(null);

  const addTimelineFunctionsToBeNestedHandler = (
    timelineFunctionToBeNested: TTimelineFunctionsToBeNested
  ) => {
    setTimelineFunctionsToBeNested((prevState) =>
      prevState
        ? [...prevState, timelineFunctionToBeNested]
        : [timelineFunctionToBeNested]
    );
  };

  ////animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      const credentialTl = gsap.timeline({
        scrollTrigger: {
          trigger: credentialItemsSectionRef.current,
          start: "center center",
          end: () => "+=" + credentialItemsSectionRef.current!.offsetHeight * 2,
          markers: true,
          pin: true,
          scrub: 0.8,
        },
      });

      // credentialTl.addLabel("start").add(timelineFunctionsToBeNested[0]);
      // .arratimelineFunctionsToBeNested.map((tlFunction) => add(tlFunction));
      // .from(
      //   credentialItemsSectionRef.current,
      //   { autoAlpha: 0, scaleY: 0, ease: Power4.easeInOut },
      //   "start"
      // );
      //   .fromTo(
      //     credentialTopLineRef.current,
      //     { autoAlpha: 0, duration: 0.4 },
      //     { autoAlpha: 1 },
      //     "start"
      //   )
      //   .fromTo(
      //     credentialTopBackgroundRef.current,
      //     { autoAlpha: 0, duration: 0.2 },
      //     { autoAlpha: 1 },
      //     "start"
      //   );
    });
    return () => ctx.revert();
  }, []);

  const tempData: TCredentialsInfoSet[] = [
    {
      backgroundTopImgUrl: "/bg-credentials_top_withoutLine.svg",
      backgroundTopLineImgUrl: "/bg-credentials_top_withLine.svg",
      portraitImgUrl: "/portrait_001.png",
      credentialText:
        "I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. .",
      backgroundBottomImgUrl: "/bg-credentials_bottom.svg",
    },
    // {
    //   backgroundTopImgUrl: "/bg-credentials_top_withoutLine.svg",
    //   backgroundTopLineImgUrl: "/bg-credentials_top_withLine.svg",
    //   portraitImgUrl: "/portrait_001.png",
    //   credentialText:
    //     "I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. .",
    //   backgroundBottomImgUrl: "/bg-credentials_bottom.svg",
    // },
  ];

  ////jsx
  return (
    <div
      className="relative w-screen h-screen bg-red-500"
      ref={credentialItemsSectionRef}
    >
      {tempData.map((credentialData, index) => (
        <Fragment key={index}>
          <CredentialItem
            credentialInfoSet={credentialData}
            addTimeline={addTimelineFunctionsToBeNestedHandler}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default AboutCredentials;
