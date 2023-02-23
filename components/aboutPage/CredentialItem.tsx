"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { TCredentialsInfoSet } from "../../types/typings";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  credentialInfoSet: TCredentialsInfoSet;
};

gsap.registerPlugin(ScrollTrigger);
const CredentialItem = (props: Props) => {
  ////vars
  const {
    backgroundTopImgUrl,
    backgroundTopLineImgUrl,
    portraitImgUrl,
    credentialText,
    backgroundBottomImgUrl,
  } = props.credentialInfoSet;

  const credentialItemRef = useRef<HTMLDivElement>(null);
  const credentialTopLineRef = useRef<HTMLDivElement>(null);
  const credentialTopBackgroundRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      const credentialTl = gsap.timeline({
        scrollTrigger: {
          trigger: credentialItemRef.current,
          start: "center center",
          end: "bottom center",
          toggleActions: "restart reverse none none",
          markers: true,
          pin: true,
          // scrub: 0.8,
        },
      });

      credentialTl
        .addLabel("start")
        .from(
          credentialItemRef.current,
          { autoAlpha: 0, scaleY: 0, ease: Power4.easeInOut, duration: 0.2 },
          "start"
        )
        .fromTo(
          credentialTopLineRef.current,
          { autoAlpha: 0, duration: 0.4 },
          { autoAlpha: 1 },
          "start"
        )
        .fromTo(
          credentialTopBackgroundRef.current,
          { autoAlpha: 0, duration: 0.2 },
          { autoAlpha: 1 },
          "start"
        );
    });
    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <div ref={credentialItemRef} className="invisible">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-[60px] w-full">
            <div
              className="absolute top-0 left-0 invisible w-full h-full"
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

export default CredentialItem;
