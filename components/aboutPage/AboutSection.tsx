"use client";

import gsap from "gsap";
import React, { Fragment, useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutTitle from "./AboutTitle";
import AboutOverall from "./AboutOverall";
import AboutDetails from "./AboutDetails";
import { TDetailsInfoSet } from "../../types/typings";
import data from "../../data/data.json";
import useDeviceSize from "../../hooks/useDeviceSize";
import AboutDetailsDesktop from "./AboutDetailsDesktop";
import AboutDetailsMobileAndTablet from "./AboutDetailsMobileAndTablet";
import AboutCredentials from "./AboutCredentials";

type Props = {
  tl: gsap.core.Timeline;
  sectionsBeforePercentage: number;
};

gsap.registerPlugin(ScrollTrigger);
const AboutSection = (props: Props) => {
  ////vars
  const { tl, sectionsBeforePercentage } = props;
  const [width, height, mediaSizeName] = useDeviceSize();

  const developerDetails: TDetailsInfoSet = {
    slidersData: data.aboutSlidersDeveloper,
    logoImageURL: "/logo_only_graph_transparency.png",
    clipPathName: "clip-path-logo-right-triangle",
    sectionPurposeName: "developer",
    paragraphText:
      "I'm a passionate Front-End Developer with +6 years of experience in developing websites that have a main focus on search functionality. I have extensive experience with JavaScript, CSS and HTML as well as using libraries and frameworks such as jQuery and Bootstrap.",
    sliders: data.aboutSlidersDeveloper,
    isFirstSectionThenNoTopMargin: true,
  };
  const designerDetails: TDetailsInfoSet = {
    slidersData: data.aboutSlidersDesigner,
    logoImageURL: "/logo_only_graph_transparency.png",
    clipPathName: "clip-path-logo-left-triangle",
    sectionPurposeName: "designer",
    paragraphText:
      "I'm a passionate Front-End Developer with +6 years of experience in developing websites that have a main focus on search functionality. I have extensive experience with JavaScript, CSS and HTML as well as using libraries and frameworks such as jQuery and Bootstrap.",
    sliders: data.aboutSlidersDesigner,
    isFirstSectionThenNoTopMargin: false,
  };

  ////jsx
  return (
    <Fragment>
      <AboutTitle />
      <AboutOverall />

      {/* developer details  */}
      {mediaSizeName === "desktop" ? (
        <AboutDetailsDesktop detailsInfoSet={developerDetails} />
      ) : (
        <AboutDetailsMobileAndTablet detailsInfoSet={developerDetails} />
      )}

      {/* designer details  */}
      {mediaSizeName === "desktop" ? (
        <AboutDetailsDesktop detailsInfoSet={designerDetails} />
      ) : (
        <AboutDetailsMobileAndTablet detailsInfoSet={designerDetails} />
      )}

      {/* <AboutCredentials /> */}
    </Fragment>
  );
};

export default AboutSection;
