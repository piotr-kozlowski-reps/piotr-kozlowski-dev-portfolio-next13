"use client";

import gsap from "gsap";
import React, { Fragment } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectsTitle from "./ProjectsTitle";

const ProjectsSection = () => {
  return (
    <Fragment>
      <div className="overflow-x-hidden overflow-y-hidden">
        <ProjectsTitle />
      </div>
      <ProjectDetails />
    </Fragment>
  );
};

export default ProjectsSection;
