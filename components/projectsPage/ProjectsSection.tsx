"use client";

import gsap from "gsap";
import React, { Fragment } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsTitle from "./ProjectsTitle";

gsap.registerPlugin(ScrollTrigger);
const ProjectsSection = () => {
  return (
    <Fragment>
      <div className="overflow-x-hidden overflow-y-hidden">
        <ProjectsTitle />
      </div>
    </Fragment>
  );
};

export default ProjectsSection;
