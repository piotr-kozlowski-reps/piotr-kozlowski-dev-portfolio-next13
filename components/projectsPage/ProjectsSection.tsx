"use client";

import React, { Fragment } from "react";
import ProjectDetails from "./ProjectDetails";
import ProjectsTitle from "./ProjectsTitle";
import data from "../../data/data.json";
import { TProjectDetails } from "../../types/typings";
import Image from "next/image";

const ProjectsSection = () => {
  ////vars
  const projectsDetails: TProjectDetails[] = data.projectsDetails;

  //modals
  const githubModalInterior = (
    <div className="flex flex-col border-t border-main_color bg-background_1_lighter">
      <div className="mx-auto mt-16 font-style-sm">
        Which part of the project code would you like to see?
      </div>
      <div className="block mx-auto mt-8 mb-8 button-outline">
        <a
          href="https://github.com/piotr-kozlowski-reps/ante_app__react"
          target="_blank"
          rel="noopener"
        >
          frontend
        </a>
      </div>
      <div className="block mx-auto mb-16 button-outline">
        <a
          href="https://github.com/piotr-kozlowski-reps/-ante_app__backend"
          target="_blank"
          rel="noopener"
        >
          backend
        </a>
      </div>
    </div>
  );

  ////jsx
  return (
    <Fragment>
      <div className="overflow-x-hidden overflow-y-hidden">
        <ProjectsTitle />
      </div>
      <ProjectDetails
        projectDetails={projectsDetails[0]}
        githubModal={githubModalInterior}
      />
      {/* {projectsDetails.map((project, index) => (
        <ProjectDetails projectDetails={project} key={index} />
      ))} */}
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
