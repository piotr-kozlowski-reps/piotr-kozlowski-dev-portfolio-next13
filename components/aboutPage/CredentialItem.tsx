"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { TCredentialsInfoSet } from "../../types/typings";
import gsap, { Power4 } from "gsap";

type Props = {
  credentialInfoSet: TCredentialsInfoSet;
  tl: gsap.core.Timeline;
};

const CredentialItem = (props: Props) => {
  ////vars
  const { tl } = props;
  const {
    backgroundTopImgUrl,
    backgroundTopLineImgUrl,
    portraitImgUrl,
    credentialText,
    backgroundBottomImgUrl,
  } = props.credentialInfoSet;

  const credentialTopLineRef = useRef<HTMLDivElement>(null);
  const credentialTopBackgroundRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // tl.addLabel("start").from(
      //   credentialTopLineRef.current,
      //   { autoAlpha: 1, x: 500 },
      //   "start"
      // );
      // gsap.from(credentialItemRef.current, { x: 500 });
    });
    return ctx.revert();
  }, []);

  ////jsx
  return (
    <div className="absolute top-0 left-0 w-full h-full">
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

export default CredentialItem;
