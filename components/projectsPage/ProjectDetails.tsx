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

  ////utils
  //TODO: delete later
  function alertHandler(message: string) {
    alert(message);
  }

  ////animations
  function createTl(ref: React.RefObject<HTMLDivElement>) {
    return gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: () => `top top`,
        end: () => `+=400%`,
        markers: true,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  }
  //project number
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      const tl = createTl(projectRef);

      tl.to(projectRef.current, { autoAlpha: 0.5 });
    });

    return () => {
      mm.revert();
    };
  }, []);

  ////jsx
  return (
    <section title="projectSection">
      <div
        className="relative flex flex-col items-start justify-center w-full h-screen"
        ref={projectRef}
      >
        <div className="w-[256px] h-[384px] ml-8 relative">
          <div
            className="absolute top-0 left-0 w-full h-full"
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
            className="absolute top-0 left-0 h-32 w-[149px]"
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
            <p className="mb-4 font-style-h3 text-main_color">ante portfolio</p>
            <p className="font-style-p">
              Portfolio website of a 3d part of my work-related activities.
              Architectural visualizations in most cases.
            </p>
          </div>

          {/* icons bottom */}
          <div className="absolute bottom-0 mb-[20px] ml-[6px] z-max">
            <div className="ml-[10px] font-style-xs pb-8 text-main_white opacity-40">
              react redux formik gsap node express
            </div>
            <div className="flex items-center justify-start ">
              <div className="w-[44px] h-[44px] relative">
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

              <div className="w-[44px] h-[44px] relative">
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
