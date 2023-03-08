"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  TCredentialsInfoSet,
  TTimelineFunctionsToBeNested,
} from "../types/typings";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

type Props = {
  credentialInfoSet: TCredentialsInfoSet;
  addTimeline: (
    timelineFunctionToBeNested: TTimelineFunctionsToBeNested
  ) => void;
};

gsap.registerPlugin(ScrollTrigger);
const AboutCredentialItem = (props: Props) => {
  ////vars
  const { credentialInfoSet, addTimeline } = props;
  const {
    backgroundTopImgUrl,
    backgroundTopLineImgUrl,
    portraitImgUrl,
    credentialText,
    backgroundBottomImgUrl,
  } = credentialInfoSet;

  const credentialItemRef = useRef<HTMLDivElement>(null);
  const credentialTopLineRef = useRef<HTMLDivElement>(null);
  const credentialTopBackgroundRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    function tlCredentialItem() {
      let tl = gsap.timeline();
      tl.fromTo(
        credentialItemRef.current,
        { autoAlpha: 0, x: 100 },
        { autoAlpha: 1, x: 0 }
      );
      return tl;
    }

    addTimeline(tlCredentialItem);
  }, []);

  ////jsx
  return (
    <div
      ref={credentialItemRef}
      className="absolute top-0 left-0 w-full h-full"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-[60px] w-full">
            <div
              className="absolute top-0 left-0 w-full h-full"
              ref={credentialTopLineRef}
            >
              <Image
                src={backgroundTopLineImgUrl}
                width={360}
                height={60}
                alt="credentials portrait"
              />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full"
              ref={credentialTopBackgroundRef}
            >
              <Image
                src={backgroundTopImgUrl}
                width={360}
                height={60}
                alt="credentials portrait"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-[44px] h-[44px] mx-auto">
                <Image
                  src={portraitImgUrl}
                  height={128}
                  width={128}
                  alt="credentials portrait"
                />
              </div>
            </div>
          </div>
          <div className="bg-background_1_lighter">
            <p className="mx-8 text-center font-style-sm">{credentialText}</p>
          </div>
          <div className="relative h-[88px] w-full ">
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src={backgroundBottomImgUrl}
                width={360}
                height={88}
                alt="credentials portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCredentialItem;
