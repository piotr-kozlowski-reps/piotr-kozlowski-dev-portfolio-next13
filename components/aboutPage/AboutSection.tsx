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
  const developerDetails: TDetailsInfoSet = data.developerDetails;
  const designerDetails: TDetailsInfoSet = data.designerDetails;

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
