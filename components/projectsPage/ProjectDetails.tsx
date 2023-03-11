import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ProjectDetails = () => {
  ////vars
  const [isGithubHover, setIsGithubHover] = useState(false);
  const [isGoToSite, setIsGoToSite] = useState(false);

  const projectRef = useRef<HTMLDivElement>(null);
  const backgroundDescriptionRef = useRef<HTMLDivElement>(null);
  const projectNumberRef = useRef<HTMLDivElement>(null);
  const projectNameRef = useRef<HTMLDivElement>(null);
  const projectDescriptionNameRef = useRef<HTMLDivElement>(null);
  const projectTechnologiesNameRef = useRef<HTMLDivElement>(null);
  const githubNameRef = useRef<HTMLDivElement>(null);
  const viewSiteNameRef = useRef<HTMLDivElement>(null);

  ////utils
  //TODO: delete later
  function alertHandler(message: string) {
    alert(message);
  }

  ////animations
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectRef.current,
          start: () => `top top`,
          end: () => `+=400%`,
          markers: true,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.addLabel("start")
        .to(projectNumberRef.current, { autoAlpha: 1 }, "start")
        .to(backgroundDescriptionRef.current, { autoAlpha: 1 }, "start")
        .to(projectNameRef.current, { autoAlpha: 1 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // useIsomorphicLayoutEffect(() => {
  //   const mm = gsap.matchMedia();

  //   mm.add("(max-width: 768px)", () => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: projectRef.current,
  //         start: () => `top top`,
  //         end: () => `+=400%`,
  //         markers: true,
  //         pin: true,
  //         scrub: 0.8,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //     tl.to(backgroundDescriptionRef.current, { autoAlpha: 1 }).to(
  //       projectNameRef.current,
  //       { autoAlpha: 1 }
  //     );
  //   });

  //   return () => {
  //     mm.revert();
  //   };
  // }, []);

  ////jsx
  return (
    <section title="projectSection">
      <div
        className="relative flex flex-col items-start justify-center w-full h-screen -mt-[100vh]"
        ref={projectRef}
      >
        <div className="absolute w-full h-full -z-10">
          <div className="mx-8">
            <Image
              src="/ante_portfolio_desktop_0001.jpg"
              alt="project description background"
              width={1214}
              height={3176}
              className=""
              // className=" xl:ml-[9px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-0"
            />
          </div>
        </div>
        <div className="w-[256px] h-[384px] ml-8 relative">
          <div
            className="absolute top-0 left-0 invisible w-full h-full"
            ref={backgroundDescriptionRef}
          >
            <Image
              src="project_description_background.svg"
              alt="project description background"
              width={1160}
              height={2000}
              className=""
              // className=" xl:ml-[9px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-0"
            />
          </div>
          <div
            className="absolute top-0 left-0 h-32 w-[149px] invisible"
            ref={projectNumberRef}
          >
            <Image
              src="01.svg"
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
              ante portfolio
            </p>
            <p
              className="invisible font-style-p"
              ref={projectDescriptionNameRef}
            >
              Portfolio website of a 3d part of my work-related activities.
              Architectural visualizations in most cases.
            </p>
          </div>

          {/* icons bottom */}
          <div className="absolute bottom-0 mb-[20px] ml-[6px] z-max">
            <div
              className="ml-[10px] font-style-xs pb-8 text-main_white opacity-40 invisible"
              ref={projectTechnologiesNameRef}
            >
              react redux formik gsap node express
            </div>
            <div className="flex items-center justify-start ">
              <div
                className="w-[44px] h-[44px] relative invisible"
                ref={githubNameRef}
              >
                <div
                  className="cursor-pointer icon-link z-max"
                  // ref={githubRef}
                  onMouseOver={() => {
                    setIsGithubHover(true);
                  }}
                  onMouseLeave={() => {
                    setIsGithubHover(false);
                  }}
                >
                  <Link href="/">
                    {isGithubHover ? (
                      <Image
                        src="gitHub_hover.svg"
                        alt="github icon hover"
                        width={44}
                        height={44}
                        onClick={alertHandler.bind(
                          null,
                          "github - not implemented"
                        )}
                      />
                    ) : (
                      <Image
                        src="gitHub.svg"
                        alt="github icon"
                        width={44}
                        height={44}
                        onClick={alertHandler.bind(
                          null,
                          "github - not implemented"
                        )}
                      />
                    )}
                  </Link>
                </div>
              </div>

              <div
                className="w-[44px] h-[44px] relative invisible"
                ref={viewSiteNameRef}
              >
                <div
                  className="cursor-pointer icon-link z-max"
                  // ref={githubRef}
                  onMouseOver={() => {
                    setIsGoToSite(true);
                  }}
                  onMouseLeave={() => {
                    setIsGoToSite(false);
                  }}
                >
                  <Link href="/">
                    {isGoToSite ? (
                      <Image
                        src="eye_hover.svg"
                        alt="eye icon hover"
                        width={44}
                        height={44}
                        onClick={alertHandler.bind(
                          null,
                          "go to site - not implemented"
                        )}
                      />
                    ) : (
                      <Image
                        src="eye.svg"
                        alt="eye icon"
                        width={44}
                        height={44}
                        onClick={alertHandler.bind(
                          null,
                          "go to site - not implemented"
                        )}
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
