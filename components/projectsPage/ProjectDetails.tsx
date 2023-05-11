import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TProjectDetails } from "../../types/typings";
import Tooltip from "../ui/Tooltip";
import { useModalState } from "../../globalState/ModalState";
import ProjectDescriptionLink from "./ProjectDescriptionLink";

type Props = {
  projectDetails: TProjectDetails;
};

gsap.registerPlugin(ScrollTrigger);
const ProjectDetails = (props: Props) => {
  ////vars
  const { numberImageURL, projectImages, projectInfo } = props.projectDetails;
  const { projectName, projectDescription, projectTechnologiesUsed, links } =
    projectInfo;

  const projectRef = useRef<HTMLDivElement>(null);
  const backgroundDescriptionRef = useRef<HTMLDivElement>(null);
  const projectNumberRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const projectDescriptionRef = useRef<HTMLDivElement>(null);
  const projectTechnologiesNameRef = useRef<HTMLDivElement>(null);
  const githubNameRef = useRef<HTMLDivElement>(null);
  const viewSiteNameRef = useRef<HTMLDivElement>(null);

  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);

  ////utils
  //TODO: delete later
  function alertHandler(message: string) {
    alert(message);
  }

  ////animations
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const createTl = () => {
      return gsap.timeline({
        scrollTrigger: {
          trigger: projectRef.current,
          start: () => `top top`,
          end: () => `+=2500%`,
          // markers: true,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    };

    console.log(projectNumberRef.current);

    const animate = (
      tl: gsap.core.Timeline,
      howMuchMoveImages: string,
      blurAmount: number
    ) => {
      tl.addLabel("start")
        .to(projectNumberRef.current, { autoAlpha: 1 }, "start")
        .fromTo(
          image1Ref.current,
          { autoAlpha: 0, y: "50vh" },
          { autoAlpha: 1, y: "-10vh", ease: "power4.in" },
          "start"
        )
        .fromTo(
          image1Ref.current,
          { filter: "blur(0px)", y: "-10vh", autoAlpha: 1 },
          {
            filter: `blur(${blurAmount}px)`,
            y: howMuchMoveImages,
            autoAlpha: 0,
          }
        );
      // .fromTo(
      //   image2Ref.current,
      //   { autoAlpha: 0, y: "50vh" },
      //   { autoAlpha: 1, y: "-10vh", ease: "power4.in" },
      //   "-=90%"
      // )
      // .fromTo(
      //   image2Ref.current,
      //   { filter: "blur(0px)", y: "-10vh", autoAlpha: 1 },
      //   {
      //     filter: `blur(${blurAmount}px)`,
      //     y: howMuchMoveImages,
      //     autoAlpha: 0,
      //   }
      // )
      // .fromTo(
      //   image3Ref.current,
      //   { autoAlpha: 0, y: "50vh" },
      //   { autoAlpha: 1, y: "-10vh", ease: "power4.in" },
      //   "-=90%"
      // )
      // .fromTo(
      //   image3Ref.current,
      //   { filter: "blur(0px)", y: "-10vh" },
      //   { filter: `blur(${blurAmount}px)`, y: howMuchMoveImages }
      // )
      // .fromTo(
      //   image4Ref.current,
      //   { autoAlpha: 0, y: "50vh" },
      //   { autoAlpha: 1, y: "-10vh", ease: "power4.in" },
      //   "-=90%"
      // )
      // .addLabel("description")
      // .fromTo(
      //   image4Ref.current,
      //   { filter: "blur(0px)", y: "-10vh" },
      //   { filter: `blur(${blurAmount * 2}px)`, y: howMuchMoveImages },
      //   "description"
      // )
      // .to(backgroundDescriptionRef.current, { autoAlpha: 1 }, "description")
      // .fromTo(
      //   projectNameRef.current,
      //   { filter: "blur(5px)", x: "-100vh", autoAlpha: 0 },
      //   { filter: "blur(0px)", x: 0, autoAlpha: 1, ease: "power4.inOut" },
      //   "description"
      // )
      // .fromTo(
      //   projectTechnologiesNameRef.current,
      //   { filter: "blur(5px)", x: "-100vh", autoAlpha: 0 },
      //   { filter: "blur(0px)", x: 0, autoAlpha: 1, ease: "power4.inOut" },
      //   "description"
      // )
      // .addLabel("descriptionAndScale")
      // .fromTo(
      //   [
      //     githubNameRef.current,
      //     viewSiteNameRef.current,
      //     projectDescriptionRef.current,
      //   ],
      //   { filter: "blur(5px)", x: "-100vh", autoAlpha: 0 },
      //   { filter: "blur(0px)", x: 0, autoAlpha: 1, ease: "power4.inOut" },
      //   "descriptionAndScale"
      // )
      // .to(projectRef.current, { autoAlpha: 1 })
      // .to(projectRef.current, { y: "-50vh", autoAlpha: 0 });
    };

    mm.add("(max-width: 768px)", () => {
      const tl = createTl();
      animate(tl, "-60vh", 1);
    });

    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      const tl = createTl();
      animate(tl, "-160vh", 3);
    });

    mm.add("(min-width: 1224px)", () => {
      const tl = createTl();
      animate(tl, "-180vh", 1);
    });

    return () => {
      mm.revert();
    };
  }, []);

  ////jsx
  return (
    <section title="projectSection">
      <div
        className="relative flex flex-col items-start justify-center w-full h-screen -mt-[100vh] overflow-y-hidden xl:w-container xl:mx-auto z-40"
        ref={projectRef}
      >
        {/* images start */}
        <div className="absolute invisible w-full h-full -z-10" ref={image1Ref}>
          <div className="ml-8 mr-[24px]">
            <Image
              src={projectImages[0].imageUrl}
              alt="project image"
              width={projectImages[0].width}
              height={projectImages[0].height}
            />
          </div>
        </div>
        <div className="absolute invisible w-full h-full -z-10" ref={image2Ref}>
          <div className="ml-8 mr-[24px]">
            <Image
              src={projectImages[1].imageUrl}
              alt="project image"
              width={projectImages[1].width}
              height={projectImages[1].height}
            />
          </div>
        </div>
        <div className="absolute invisible w-full h-full -z-10" ref={image3Ref}>
          <div className="ml-8 mr-[24px]">
            <Image
              src={projectImages[2].imageUrl}
              alt="project image"
              width={projectImages[2].width}
              height={projectImages[2].height}
            />
          </div>
        </div>
        <div
          className="absolute top-0 right-0 invisible float-right w-4/5 h-full md:w-full -z-10"
          ref={image4Ref}
        >
          <div className="ml-8 mr-[24px]">
            <Image
              src={projectImages[3].imageUrl}
              alt="project image"
              width={projectImages[3].width}
              height={projectImages[3].height}
              className="absolute right-0 md:right-0 mr-[24px] md:mr-[120px]"
            />
          </div>
        </div>
        {/* images end */}
        <div className="w-[256px] md:w-[384px] h-[384px] ml-8 relative">
          <div
            className="absolute top-0 left-0 invisible w-full h-full"
            ref={backgroundDescriptionRef}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 257 385"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M227.614 384L-8.88109e-06 372.217V-5.84126e-06L256 11.7834L227.614 384Z"
                fill="#2C2F36"
              />
              <path d="M227.614 384L256 11.7834" stroke="#FCEB41" />
            </svg>
          </div>
          <div
            className="absolute top-0 left-0 h-32 w-[149px] invisible"
            ref={projectNumberRef}
          >
            <Image
              src={numberImageURL}
              alt="project number"
              width={400}
              height={400}
              // className=" xl:ml-[9px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-0"
            />
          </div>
          <div className="absolute mt-[26px] ml-4 w-fill h-fill">
            <p
              className="invisible mb-4 font-style-h3 text-main_color"
              ref={projectNameRef}
            >
              {projectName}
            </p>
            <p
              className="invisible mr-8 font-style-sm"
              ref={projectDescriptionRef}
            >
              {projectDescription}
            </p>
          </div>

          {/* icons bottom */}
          <div className="absolute bottom-0 mb-[20px] ml-[6px] z-100">
            <div
              className="ml-[10px] font-style-xs pb-8 text-main_white opacity-40 invisible"
              ref={projectTechnologiesNameRef}
            >
              {projectTechnologiesUsed}
            </div>
            <div className="flex items-center justify-start ">
              <ProjectDescriptionLink
                linkDetails={links.github}
                ref={githubNameRef}
                iconBaseUrl="github.svg"
                iconBaseAlt="github icon"
                iconHoverUrl="gitHub_hover.svg"
                iconHoverAlt="github icon hover"
              />
              <ProjectDescriptionLink
                linkDetails={links.seeWWW}
                ref={viewSiteNameRef}
                iconBaseUrl="eye.svg"
                iconBaseAlt="eye icon"
                iconHoverUrl="eye_hover.svg"
                iconHoverAlt="eye icon hover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
