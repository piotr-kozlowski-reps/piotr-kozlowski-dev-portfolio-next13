import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  timeline: gsap.core.Timeline;
  // footerRef: React.RefObject<HTMLDivElement>;
}

const Navigation: FunctionComponent<Props> = ({ timeline }) => {
  ////vars
  const [isHamburger, setIsHamburger] = useState(true);

  let mobileNavigationRef = useRef<HTMLDivElement>(null);
  let hamburgerIconRef1 = useRef<HTMLDivElement>(null);
  let hamburgerIconRef2 = useRef<HTMLDivElement>(null);

  ////logic
  /** Toggling HamburgerIcon and "X" */
  function toggleHamburgerIcon() {
    if (isHamburger && isLessThanOrEqualMdSize()) {
      hamburgerIntoXAnimation(hamburgerIconRef1, hamburgerIconRef2);
      showMobileNavigation();
      setIsHamburger(false);
    }
    if (!isHamburger && isLessThanOrEqualMdSize()) {
      XIntoHamburgerAnimation(hamburgerIconRef1, hamburgerIconRef2);
      hideMobileNavigation();
      setIsHamburger(true);
    }
  }

  ////jsx
  return (
    <React.Fragment>
      <div className="relative">
        {/* mobile navigation - start */}
        {/* <div
          className=" bg-background-2 w-full h-screen z-10 clip-path-mobileNavigationStartPath fixed"
          ref={mobileNavigationRef}
        >
          <div>
            <ul className="uppercase text-lg font-quicksand font-semibold text-white flex flex-col gap-7 justify-end items-end pt-[5.5rem] pr-8">
              <li
                className="cursor-pointer"
                ref={homeMobileRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  homeMobileRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  homeMobileRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    <span className="">home</span>
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={aboutMobileRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  aboutMobileRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  aboutMobileRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    about
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={projectsMobileRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  projectsMobileRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  projectsMobileRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    projects
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={contactMobileRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  contactMobileRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  contactMobileRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 justify-end items-end">
            <div className="pt-20 pr-8 w-20">
              <hr />
            </div>
            <div
              ref={githubMobileRef}
              className="cursor-pointer z-50 pr-8 pt-4 "
              onMouseEnter={mouseEventsAnimationHandler.bind(
                null,
                githubMobileRef,
                1,
                1.1,
                0.3
              )}
              onMouseLeave={mouseEventsAnimationHandler.bind(
                null,
                githubMobileRef,
                1.1,
                1,
                0.3
              )}
            >
              <Link href="/">
                <a>
                  <Image
                    src={"/githubIcon.svg"}
                    alt="gitHubIcon"
                    width={25}
                    height={25}
                    onClick={alertHandler.bind(null, "not implemented")}
                  />
                </a>
              </Link>
            </div>
            <div
              ref={linkedinMobileRef}
              className="cursor-pointer z-50 pr-8"
              onMouseEnter={mouseEventsAnimationHandler.bind(
                null,
                linkedinMobileRef,
                1,
                1.1,
                0.3
              )}
              onMouseLeave={mouseEventsAnimationHandler.bind(
                null,
                linkedinMobileRef,
                1.1,
                1,
                0.3
              )}
            >
              <Link href="/">
                <a>
                  <Image
                    src={"/linkedinIcon.svg"}
                    alt="linkedInIcon"
                    width={25}
                    height={25}
                    onClick={alertHandler.bind(null, "not implemented")}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div> */}
        {/* mobile navigation - end */}

        {/* <div className="absolute top-6 left-6" ref={logoRef}>
          <img
            src={"/logo2.svg"}
            alt="piotr kozłowski portfolio logo"
            className="w-32"
          />
        </div> */}
        <div>
          {/* <div
            className="absolute top-7 right-32 py-px"
            // style={{ paddingTop: 1 }}
          >
            <ul className="uppercase text-xs font-quicksand font-semibold text-white flex gap-4 justify-end items-center">
              <li
                className="cursor-pointer"
                ref={homeRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  homeRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  homeRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    <span className="">home</span>
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={aboutRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  aboutRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  aboutRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    about
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={projectsRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  projectsRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  projectsRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    projects
                  </span>
                </Link>
              </li>
              <li
                className="cursor-pointer"
                ref={contactRef}
                onMouseEnter={mouseEventsAnimationHandler.bind(
                  null,
                  contactRef,
                  1,
                  1.1,
                  0.3
                )}
                onMouseLeave={mouseEventsAnimationHandler.bind(
                  null,
                  contactRef,
                  1.1,
                  1,
                  0.3
                )}
              >
                <Link href={"/"}>
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    contact
                  </span>
                </Link>
              </li>
            </ul>
          </div> */}
          {/* <div className="absolute top-7 right-7 flex justify-end items-center gap-4">
            <div
              ref={githubRef}
              className="cursor-pointer z-50"
              onMouseEnter={mouseEventsAnimationHandler.bind(
                null,
                githubRef,
                1,
                1.1,
                0.3
              )}
              onMouseLeave={mouseEventsAnimationHandler.bind(
                null,
                githubRef,
                1.1,
                1,
                0.3
              )}
            >
              <Link href="/">
                <a>
                  <Image
                    src={"/githubIcon.svg"}
                    alt="gitHubIcon"
                    width={19}
                    height={19}
                    onClick={alertHandler.bind(null, "not implemented")}
                  />
                </a>
              </Link>
            </div>
            <div
              ref={linkedinRef}
              className="cursor-pointer z-50"
              onMouseEnter={mouseEventsAnimationHandler.bind(
                null,
                linkedinRef,
                1,
                1.1,
                0.3
              )}
              onMouseLeave={mouseEventsAnimationHandler.bind(
                null,
                linkedinRef,
                1.1,
                1,
                0.3
              )}
            >
              <Link href="/">
                <a>
                  <Image
                    src={"/linkedinIcon.svg"}
                    alt="linkedInIcon"
                    width={19}
                    height={19}
                    onClick={alertHandler.bind(null, "not implemented")}
                  />
                </a>
              </Link>
            </div>
          </div> */}
          <div
            className="w-9 h-9 absolute transition ease-out hover:scale-110 md:hover:scale-100 top-6 right-8 z-50"
            onClick={toggleHamburgerIcon}
          >
            <div className="absolute top-0 left-0 z-20" ref={hamburgerIconRef1}>
              <Image
                src={"/hamburger.svg"}
                alt="hamburger icon"
                width={35}
                height={35}
                className="cursor-pointer md:cursor-default"
              />
            </div>
            <div className="absolute top-0 left-0" ref={hamburgerIconRef2}>
              <Image
                src={"/hamburger.svg"}
                alt="hamburger icon"
                width={35}
                height={35}
                className="cursor-pointer md:cursor-default"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
