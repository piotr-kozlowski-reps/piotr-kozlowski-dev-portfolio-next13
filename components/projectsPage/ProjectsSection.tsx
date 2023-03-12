"use client";

import React, { Fragment } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectsTitle from "./ProjectsTitle";
import data from "../../data/data.json";
import { TProjectDetails } from "../../types/typings";
import Image from "next/image";

const ProjectsSection = () => {
  console.log(data);

  ////vars
  const projectsDetails: TProjectDetails[] = data.projectsDetails;

  ////jsx
  return (
    <Fragment>
      <div className="overflow-x-hidden overflow-y-hidden">
        <ProjectsTitle />
      </div>
      {projectsDetails.map((project) => (
        <ProjectDetails projectDetails={project} />
      ))}
      <div className="h-[93px] w-full">
        <svg
          width="100%"
          height="93"
          viewBox="0 0 360 93"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M215 31.9999L360 0V93H0V7.99995L215 31.9999Z"
            fill="#26292E"
          />
        </svg>
      </div>
    </Fragment>
  );
};

export default ProjectsSection;
