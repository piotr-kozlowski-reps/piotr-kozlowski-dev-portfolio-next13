import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import useDeviceSize from "../hooks/useDeviceSize";
import {
  hamburgerIntoSeparatorAnimation,
  hideElementsInXAnimation,
  revealElementsInXAnimation,
  separatorIntoHamburgerAnimation,
} from "../utils/animations";
import Link from "next/link";

interface Props {
  timeline: gsap.core.Timeline;
  footerRef: React.RefObject<HTMLDivElement>;
}

const Navigation: FunctionComponent<Props> = ({ timeline, footerRef }) => {
  ////vars
  const [isHamburger, setIsHamburger] = useState(true);
  const [isShowMobileNavigation, setIsShowMobileNavigation] = useState(false);
  const [width, height] = useDeviceSize();

  let hamburgerIconRef = useRef<HTMLDivElement>(null);
  let separatorIconRef = useRef<HTMLDivElement>(null);
  let homeRef = useRef<HTMLLIElement>(null);
  let aboutRef = useRef<HTMLLIElement>(null);
  let projectsRef = useRef<HTMLLIElement>(null);
  let contactRef = useRef<HTMLLIElement>(null);
  let githubRef = useRef<HTMLDivElement>(null);
  let linkedinRef = useRef<HTMLDivElement>(null);

  ////utils
  //TODO: delete later
  function alertHandler(message: string) {
    alert(message);
  }
  // const showMobileNavigation = () => {
  //   const tl = gsap.timeline();
  //   tl.to(footerRef.current, { y: 200, duration: 0.4 }).to(
  //     mobileNavigationRef.current,
  //     {
  //       clipPath: "polygon(3% 0%, 100% 0%, 100% 100%, 100% 100%, 15% 90%)",
  //       duration: 0.3,
  //     },
  //     "-=0.3"
  //   );
  //   setIsShowMobileNavigation(true);
  // };
  // const hideMobileNavigation = useCallback(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({ ease: "elastic.out(1, 0.3)" });
  //     tl.to(mobileNavigationRef.current, {
  //       clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 70%)",
  //       duration: 0.3,
  //     }).to(footerRef.current, { y: 0, duration: 0.3 }, "-=0.3");
  //   });
  //   setIsShowMobileNavigation(false);
  // }, [footerRef]);

  ////logic
  const isLessThanOrEqualMdSize = useCallback(() => {
    return width < 768 ? true : false;
  }, [width]);
  /** Toggling HamburgerIcon and "X" */
  function toggleHamburgerIcon() {
    console.log("toggleHamburgerIcon");

    // if (isHamburger && isLessThanOrEqualMdSize()) {
    //   // hamburgerIntoXAnimation(hamburgerIconRef1, hamburgerIconRef2);
    //   showMobileNavigation();
    //   setIsHamburger(false);
    // }
    // if (!isHamburger && isLessThanOrEqualMdSize()) {
    //   // XIntoHamburgerAnimation(hamburgerIconRef1, hamburgerIconRef2);
    //   hideMobileNavigation();
    //   setIsHamburger(true);
    // }
  }

  ////side effects
  /** Triggering animation of Hamburger Icon when media query changes */
  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        separatorIntoHamburgerAnimation(hamburgerIconRef, separatorIconRef);
        hideElementsInXAnimation(
          [
            linkedinRef.current!,
            githubRef.current!,
            contactRef.current!,
            projectsRef.current!,
            aboutRef.current!,
            homeRef.current!,
          ],
          0,
          0.3,
          0.04,
          0,
          60
        );
      });

      mm.add("(min-width: 769px)", () => {
        hamburgerIntoSeparatorAnimation(hamburgerIconRef, separatorIconRef);
        revealElementsInXAnimation(
          [
            homeRef.current!,
            aboutRef.current!,
            projectsRef.current!,
            contactRef.current!,
            githubRef.current!,
            linkedinRef.current!,
          ],
          0.3,
          0.4,
          0.02,
          60,
          0
        );
      });
    });

    return () => ctx.revert();
  }, []);

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

          {/* <ul className="uppercase text-lg font-quicksand font-semibold text-white flex flex-col gap-7 justify-end items-end pt-[5.5rem] pr-8">
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
              </li> */}

          {/* links - start */}
          <div className="absolute top-8 right-132px w-96">
            <ul className="flex justify-end gap-6">
              <li className="link" ref={homeRef}>
                <Link href="/">
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    HOME
                  </span>
                </Link>
              </li>
              <li className="link" ref={aboutRef}>
                <Link href="/">
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    ABOUT
                  </span>
                </Link>
              </li>
              <li className="link" ref={projectsRef}>
                <Link href="/">
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    Projects
                  </span>
                </Link>
              </li>
              <li className="link" ref={contactRef}>
                <Link href="/">
                  <span onClick={alertHandler.bind(null, "not implemented")}>
                    contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* links - end */}

          {/* socials - start */}
          <div
            className="absolute top-11 right-57px cursor-pointer z-max"
            ref={githubRef}
          >
            <Link href="/">
              <Image
                src="github.svg"
                alt="github icon"
                width={21}
                height={21}
                onClick={alertHandler.bind(null, "not implemented")}
              />
            </Link>
          </div>

          <div
            className="absolute top-42px right-7 cursor-pointer z-max"
            ref={linkedinRef}
          >
            <Link href="/">
              <Image
                src="linkedIn.svg"
                alt="linkedIn icon"
                width={24}
                height={24}
                onClick={alertHandler.bind(null, "not implemented")}
              />
            </Link>
          </div>
          {/* socials - end */}

          {/* logo - start */}
          <div className="absolute top-8 left-8">
            <Image
              src="/logo_transparency 1.png"
              alt="piotr kozłowski dev-portfolio"
              width={160}
              height={44}
            />
          </div>
          {/* logo - end*/}

          {/* hamburger / separator icons - start */}
          <div
            className="w-16 absolute top-8 right-1 z-50"
            onClick={toggleHamburgerIcon}
          >
            <div ref={hamburgerIconRef}>
              <Image
                src="/hamburger.svg"
                alt="hamburger icon"
                width={44}
                height={44}
                className="cursor-pointer md:cursor-default"
                priority={true}
              />
            </div>
          </div>
          <div className="w-16 absolute top-8 right-1 z-50">
            <div ref={separatorIconRef}>
              <Image
                src="/separator.svg"
                alt="separator icon"
                width={44}
                height={44}
                className="cursor-pointer md:cursor-default"
                priority={true}
              />
            </div>
          </div>
          {/* hamburger / separator icons - end */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
