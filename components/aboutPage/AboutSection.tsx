"use client";

import gsap from "gsap";
import React, { Fragment } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutTitle from "./AboutTitle";
import AboutOverall from "./AboutOverall";
import AboutDetails from "./AboutDetails";
import { TDetailsInfoSet } from "../../types/typings";
import data from "../../data/data.json";
import AboutCredentials from "./AboutCredentials";

gsap.registerPlugin(ScrollTrigger);
const AboutSection = () => {
  ////vars
  const developerDetails: TDetailsInfoSet = {
    slidersData: data.aboutSlidersDeveloper,
    logoImageURL: "/logo_only_graph_transparency.png",
    clipPathName: "clip-path-logo-right-triangle",
    sectionPurposeName: "developer",
    paragraphText:
      "Lorem ipsum ....I'm a passionate Front-End Developer with +6 years of experience in developing websites that have a main focus on search functionality. I have extensive experience with JavaScript, CSS and HTML as well as using libraries and frameworks such as jQuery and Bootstrap.",
    sliders: data.aboutSlidersDeveloper,
    isFirstSectionThenNoTopMargin: true,
  };
  const designerDetails: TDetailsInfoSet = {
    slidersData: data.aboutSlidersDesigner,
    logoImageURL: "/logo_only_graph_transparency.png",
    clipPathName: "clip-path-logo-left-triangle",
    sectionPurposeName: "designer",
    paragraphText:
      "Lorem ipsum ....I'm a passionate Front-End Developer with +6 years of experience in developing websites that have a main focus on search functionality. I have extensive experience with JavaScript, CSS and HTML as well as using libraries and frameworks such as jQuery and Bootstrap.",
    sliders: data.aboutSlidersDesigner,
    isFirstSectionThenNoTopMargin: false,
  };

  ////jsx
  return (
    <Fragment>
      <div className="overflow-x-hidden overflow-y-hidden">
        <AboutTitle />
      </div>

      <AboutOverall />
      <AboutDetails detailsInfoSet={developerDetails} />
      <AboutDetails detailsInfoSet={designerDetails} />

      <AboutCredentials />
    </Fragment>
  );
};

export default AboutSection;
