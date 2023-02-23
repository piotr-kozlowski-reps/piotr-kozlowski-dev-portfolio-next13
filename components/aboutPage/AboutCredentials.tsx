import Image from "next/image";
import React, { Fragment, useRef } from "react";
import { TCredentialsInfoSet } from "../../types/typings";
import CredentialItem from "./CredentialItem";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const AboutCredentials = () => {
  ////vars
  // const tlCredentials = useRef(() => {
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: credentialItemRef.current,
  //       start: "center center",
  //       markers: true,
  //       pin: true,
  //       // scrub: 0.8,
  //     },
  //   });
  // });

  const tempData: TCredentialsInfoSet[] = [
    {
      backgroundTopImgUrl: "/bg-credentials_top_withoutLine.svg",
      backgroundTopLineImgUrl: "/bg-credentials_top_withLine.svg",
      portraitImgUrl: "/portrait_001.png",
      credentialText:
        "I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. .",
      backgroundBottomImgUrl: "/bg-credentials_bottom.svg",
    },
    {
      backgroundTopImgUrl: "/bg-credentials_top_withoutLine.svg",
      backgroundTopLineImgUrl: "/bg-credentials_top_withLine.svg",
      portraitImgUrl: "/portrait_001.png",
      credentialText:
        "I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. I really love that, but there seems to be issues like for example he, is too old. .",
      backgroundBottomImgUrl: "/bg-credentials_bottom.svg",
    },
  ];

  ////jsx
  return (
    <Fragment>
      {tempData.map((credentialData, index) => (
        <Fragment key={index}>
          <CredentialItem credentialInfoSet={credentialData} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default AboutCredentials;
