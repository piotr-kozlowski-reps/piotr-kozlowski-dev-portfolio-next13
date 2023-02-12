"use client";

import gsap from "gsap";
import React, { Fragment, useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AboutTitle from "./AboutTitle";
import AboutOverall from "./AboutOverall";
import AboutDeveloper from "./AboutDeveloper";

type Props = {
  tl: gsap.core.Timeline;
  sectionsBeforePercentage: number;
};

gsap.registerPlugin(ScrollTrigger);
const AboutSection = (props: Props) => {
  ////vars
  const { tl, sectionsBeforePercentage } = props;

  ////jsx
  return (
    <Fragment>
      <AboutTitle />
      <AboutOverall />
      <AboutDeveloper />
    </Fragment>
  );
};

export default AboutSection;
