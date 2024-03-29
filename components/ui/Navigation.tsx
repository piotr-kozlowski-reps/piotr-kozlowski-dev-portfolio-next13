"use client";

import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDeviceSize from "../../hooks/useDeviceSize";
import {
  hamburgerIntoSeparatorAnimation,
  hamburgerIntoXAnimation,
  hideElementsInXAnimation,
  hideElementsInXAnimationInitialForMobileView_Invisibly,
  revealElementsInXAnimation,
  separatorIntoHamburgerAnimation,
  XIntoHamburgerAnimation,
} from "../../utils/animations";
import Link from "next/link";
import { TWhichSectionIsActive } from "../../types/typings";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import data from "../../data/data.json";

/** avoid start animation when site starts in mobile mode
 * "(max-width: 768px)" animation when starts only when number of renders is more than initial 2
 * counts from 0 so: 0, 1, trigger*/
let isFirstRender = 0;

type Props = {
  aboutSection: HTMLDivElement;
  projectsSection: HTMLDivElement;
  contactSection: HTMLDivElement;
  backgroundFadeRef: HTMLDivElement;
  whichSectionIsActive: TWhichSectionIsActive;
};

gsap.registerPlugin(ScrollTrigger);
const Navigation: FunctionComponent<Props> = (props) => {
  ////vars
  const {
    aboutSection,
    projectsSection,
    contactSection,
    backgroundFadeRef,
    whichSectionIsActive,
  } = props;

  const { githubMainLink, linkedInLink } = data;

  const [isHamburger, setIsHamburger] = useState(true);
  const isShowingMobileNavigation = useRef(false);
  const [width, _height] = useDeviceSize();
  const [isLinkedInHover, setIsLinkedInHover] = useState(false);
  const [isGithubHover, setIsGithubHover] = useState(false);

  const hamburgerIconRef = useRef<HTMLDivElement>(null);
  const separatorIconRef = useRef<HTMLDivElement>(null);
  const XIconRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLLIElement>(null);
  const aboutRef = useRef<HTMLLIElement>(null);
  const projectsRef = useRef<HTMLLIElement>(null);
  const contactRef = useRef<HTMLLIElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);
  const mobileMenuBackground1 = useRef<HTMLDivElement>(null);
  const mobileMenuBackground2 = useRef<HTMLDivElement>(null);
  const mobile_homeRef = useRef<HTMLLIElement>(null);
  const mobile_aboutRef = useRef<HTMLLIElement>(null);
  const mobile_projectsRef = useRef<HTMLLIElement>(null);
  const mobile_contactRef = useRef<HTMLLIElement>(null);
  const mobile_githubRef = useRef<HTMLDivElement>(null);
  const mobile_linkedinRef = useRef<HTMLDivElement>(null);
  const mobileSeparatorRef = useRef<HTMLDivElement>(null);

  ////logic
  const isLessThanOrEqualMdSize = useCallback(() => {
    return width <= 768 ? true : false;
  }, [width]);

  /**mobile navigation animation */
  const background1Start: gsap.TweenVars = {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 19%)",
    duration: 0.3,
  };
  const background1End: gsap.TweenVars = {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.3,
  };
  const background2Start: gsap.TweenVars = {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 33%)",
    duration: 0.3,
  };
  const background2End: gsap.TweenVars = {
    clipPath: "polygon(74% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 33%)",
    duration: 0.3,
  };

  const xShift = 80;
  function showMobileNavigation() {
    const tl = gsap.timeline();
    tl.fromTo(mobileMenuBackground1.current, background1Start, background1End);
    tl.fromTo(
      mobileMenuBackground2.current,
      background2Start,
      background2End,
      "-=0.3"
    );
    revealElementsInXAnimation(
      [
        mobile_homeRef.current!,
        mobile_aboutRef.current!,
        mobile_projectsRef.current!,
        mobile_contactRef.current!,
        mobileSeparatorRef.current!,
        mobile_githubRef.current!,
        mobile_linkedinRef.current!,
      ],
      0.1,
      0.2,
      0.05,
      xShift,
      0
    );
    isShowingMobileNavigation.current = true;
  }
  function hideMobileNavigation() {
    const tl = gsap.timeline();
    tl.fromTo(
      mobileMenuBackground1.current,
      background1End,
      background1Start,
      "+=0.1"
    );
    tl.fromTo(
      mobileMenuBackground2.current,
      background2End,
      background2Start,
      "-=0.3"
    );
    hideElementsInXAnimation(
      [
        mobile_linkedinRef.current!,
        mobile_githubRef.current!,
        mobileSeparatorRef.current!,
        mobile_contactRef.current!,
        mobile_projectsRef.current!,
        mobile_aboutRef.current!,
        mobile_homeRef.current!,
      ],
      0,
      0.1,
      0.04,
      0,
      xShift
    );
    isShowingMobileNavigation.current = false;
  }

  /** Toggling HamburgerIcon and "X" */
  function toggleHamburgerIcon() {
    if (isHamburger && isLessThanOrEqualMdSize()) {
      hamburgerIntoXAnimation(hamburgerIconRef, XIconRef);
      showMobileNavigation();
      setIsHamburger(false);
    }
    if (!isHamburger && isLessThanOrEqualMdSize()) {
      XIntoHamburgerAnimation(hamburgerIconRef, XIconRef);
      hideMobileNavigation();
      setIsHamburger(true);
    }
  }

  /** Trigger mobile navigation and hide mobile menu */
  function triggerMobileNavigation(sectionToMoveInto: HTMLDivElement | null) {
    scrollWithFadingHandler(sectionToMoveInto);
    hideMobileNavigation();
    toggleHamburgerIcon();
  }

  /** Trigger background fading and scrollMovement when desktop navigation clicked */
  function scrollWithFadingHandler(sectionToMoveInto: HTMLDivElement | null) {
    const tl = gsap.timeline();
    tl.fromTo(
      backgroundFadeRef,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.2,
        onComplete: () => {
          if (!sectionToMoveInto) window.scroll({ top: 0 });
          else sectionToMoveInto.scrollIntoView();
        },
      }
    );
    tl.fromTo(
      backgroundFadeRef,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.4 }
    );
  }

  /** Triggering animation of Hamburger Icon when media query changes */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        if (isFirstRender <= 1) {
          hideElementsInXAnimationInitialForMobileView_Invisibly(
            [
              linkedinRef.current!,
              githubRef.current!,
              contactRef.current!,
              projectsRef.current!,
              aboutRef.current!,
              homeRef.current!,
            ],
            0,
            0.4,
            0.04,
            0,
            xShift
          );
        }
        if (isFirstRender > 1) {
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
            0.4,
            0.04,
            0,
            xShift
          );
        }
        isFirstRender += 1;
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
          0.04,
          xShift,
          0
        );
        isFirstRender += 1;
      });
    });

    return () => ctx.revert();
  }, []);

  /** Getting rid of mobile menu when media query changes to bigger than mobile */
  useIsomorphicLayoutEffect(() => {
    if (!isLessThanOrEqualMdSize() && isShowingMobileNavigation.current) {
      hideElementsInXAnimation([XIconRef.current!], 0, 0.4, 0.04, 0, 0);
      setIsHamburger(true);
      hideMobileNavigation();
    }
  }, [width, isShowingMobileNavigation]);

  ////jsx
  return (
    <React.Fragment>
      {/* mobile - menu - start */}
      <div
        className="absolute top-0 left-0 z-50 w-screen h-screen xl:w-fit xl:h-fit"
        style={{
          visibility: isShowingMobileNavigation.current ? "visible" : "hidden",
        }}
      >
        <div className="relative w-screen h-screen xl:w-fit xl:h-fit">
          <div
            className="absolute top-0 left-0 z-50 w-screen h-screen bg-background_1_lighter clip-path-mobile-menu-bg1 xl:w-fit xl:h-fit"
            ref={mobileMenuBackground1}
          ></div>
          <div
            className="absolute top-0 left-0 z-50 w-screen h-screen bg-background_2_darker clip-path-mobile-menu-bg2 xl:w-fit xl:h-fit"
            ref={mobileMenuBackground2}
          ></div>
        </div>

        {/* mobile links - start */}
        <nav className="absolute top-[33%] w-64 h-fit mt-[19px] z-60 right-[25px] xl:right-16">
          <ul className="flex flex-col items-end justify-start">
            <li
              className={
                whichSectionIsActive.home
                  ? "invisible mobile-link-active"
                  : "invisible mobile-link"
              }
              ref={mobile_homeRef}
              data-testid="nav-mobile-home"
            >
              <Link href="/">
                <span onClick={triggerMobileNavigation.bind(null, null)}>
                  HOME
                </span>
              </Link>
            </li>
            <li
              className={
                whichSectionIsActive.about
                  ? "invisible mobile-link-active"
                  : "invisible mobile-link"
              }
              ref={mobile_aboutRef}
              data-testid="nav-mobile-about"
            >
              <Link href="/">
                <span
                  onClick={triggerMobileNavigation.bind(null, aboutSection)}
                >
                  ABOUT
                </span>
              </Link>
            </li>
            <li
              className={
                whichSectionIsActive.projects
                  ? "invisible mobile-link-active"
                  : "invisible mobile-link"
              }
              ref={mobile_projectsRef}
              data-testid="nav-mobile-projects"
            >
              <Link href="/">
                <span
                  onClick={triggerMobileNavigation.bind(null, projectsSection)}
                >
                  Projects
                </span>
              </Link>
            </li>
            <li
              className={
                whichSectionIsActive.contact
                  ? "invisible mobile-link-active"
                  : "invisible mobile-link"
              }
              ref={mobile_contactRef}
              data-testid="nav-mobile-contact"
            >
              <Link href="/">
                <span
                  onClick={triggerMobileNavigation.bind(null, contactSection)}
                >
                  contact
                </span>
              </Link>
            </li>
            <div className="py-12 mr-[7px] invisible" ref={mobileSeparatorRef}>
              <Image
                src="/mobile_separator.svg"
                alt="mobile separator icon"
                width={32}
                height={2}
                priority={true}
              />
            </div>

            <div className="flex -mr-[3px] mt-1">
              <div
                ref={mobile_githubRef}
                className="invisible"
                onMouseOver={() => {
                  setIsGithubHover(true);
                }}
                onMouseLeave={() => {
                  setIsGithubHover(false);
                }}
                data-testid="nav-mobile-github"
              >
                <a
                  href={githubMainLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isGithubHover ? (
                    <Image
                      src="gitHub_hover.svg"
                      alt="github icon"
                      width={44}
                      height={44}
                    />
                  ) : (
                    <Image
                      src="github.svg"
                      alt="github icon"
                      width={44}
                      height={44}
                    />
                  )}
                </a>
              </div>

              <div
                ref={mobile_linkedinRef}
                className="invisible"
                onMouseOver={() => {
                  setIsLinkedInHover(true);
                }}
                onMouseLeave={() => {
                  setIsLinkedInHover(false);
                }}
                data-testid="nav-mobile-linkedin"
              >
                <a
                  href={linkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isLinkedInHover ? (
                    <Image
                      src="linkedIn_hover.svg"
                      alt="linkedIn icon"
                      width={44}
                      height={44}
                    />
                  ) : (
                    <Image
                      src="linkedIn.svg"
                      alt="linkedIn icon"
                      width={44}
                      height={44}
                    />
                  )}
                </a>
              </div>
            </div>
          </ul>
        </nav>
        {/* mobile links - end */}
      </div>
      {/* mobile - menu - stop */}

      {/* navigation for tablet + desktops */}
      <div className="relative">
        <div>
          {/* tablet and desktop -> links - start */}
          <nav
            className="absolute z-50 top-8 right-132px w-96"
            data-testid="nav-desktop"
          >
            <ul className="flex justify-end gap-2">
              <li
                className={
                  whichSectionIsActive.home
                    ? "opacity-0 link-active "
                    : "opacity-0 link"
                }
                ref={homeRef}
                data-testid="nav-desktop-home"
              >
                <Link
                  href="/"
                  className={
                    whichSectionIsActive.home
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  <span onClick={scrollWithFadingHandler.bind(null, null)}>
                    HOME
                  </span>
                </Link>
              </li>
              <li
                className={
                  whichSectionIsActive.about
                    ? "opacity-0 link-active"
                    : "opacity-0 link"
                }
                ref={aboutRef}
                data-testid="nav-desktop-about"
              >
                <Link
                  href="/"
                  className={
                    whichSectionIsActive.about
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  <span
                    onClick={scrollWithFadingHandler.bind(null, aboutSection)}
                  >
                    ABOUT
                  </span>
                </Link>
              </li>
              <li
                className={
                  whichSectionIsActive.projects
                    ? "opacity-0 link-active"
                    : "opacity-0 link"
                }
                ref={projectsRef}
                data-testid="nav-desktop-projects"
              >
                <Link
                  href="/"
                  className={
                    whichSectionIsActive.projects
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  <span
                    onClick={scrollWithFadingHandler.bind(
                      null,
                      projectsSection
                    )}
                  >
                    Projects
                  </span>
                </Link>
              </li>
              <li
                className={
                  whichSectionIsActive.contact
                    ? "opacity-0 link-active"
                    : "opacity-0 link"
                }
                ref={contactRef}
                data-testid="nav-desktop-contact"
              >
                <Link
                  href="/"
                  className={
                    whichSectionIsActive.contact
                      ? "cursor-default"
                      : "cursor-pointer"
                  }
                >
                  <span
                    onClick={scrollWithFadingHandler.bind(null, contactSection)}
                  >
                    contact
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* tablet and desktop links - end */}

          {/* tablet and desktop - socials - start */}
          <div
            className="absolute opacity-0 cursor-pointer top-11 right-57px z-200 icon-link"
            ref={githubRef}
            onMouseOver={() => {
              setIsGithubHover(true);
            }}
            onMouseLeave={() => {
              setIsGithubHover(false);
            }}
            data-testid="nav-desktop-github"
          >
            <a href={githubMainLink} target="_blank" rel="noopener noreferrer">
              {isGithubHover ? (
                <Image
                  src="gitHub_hover.svg"
                  alt="github icon hover"
                  width={21}
                  height={21}
                />
              ) : (
                <Image
                  src="github.svg"
                  alt="github icon"
                  width={21}
                  height={21}
                />
              )}
            </a>
          </div>

          <div
            className="absolute opacity-0 cursor-pointer top-42px right-26px z-200 icon-link"
            ref={linkedinRef}
            onMouseOver={() => {
              setIsLinkedInHover(true);
            }}
            onMouseLeave={() => {
              setIsLinkedInHover(false);
            }}
            data-testid="nav-linkedin-github"
          >
            <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
              {isLinkedInHover ? (
                <Image
                  src="linkedIn_hover.svg"
                  alt="linkedIn icon hover"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="linkedIn.svg"
                  alt="linkedIn icon"
                  width={24}
                  height={24}
                />
              )}
            </a>
          </div>
          {/* tablet and desktop - socials - end */}

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
            className="absolute w-16 top-8 z-200 right-1 md:z-50"
            onClick={toggleHamburgerIcon}
            data-testid="nav-mobile-hamburger"
          >
            <div
              ref={hamburgerIconRef}
              className="cursor-pointer md:cursor-default "
            >
              <Image
                src="/hamburger.svg"
                alt="hamburger icon"
                width={44}
                height={44}
                priority={true}
              />
            </div>
          </div>

          <div
            className="absolute w-16 top-8 right-1 z-200 md:z-50 "
            onClick={toggleHamburgerIcon}
            data-testid="nav-mobile-x"
          >
            <div ref={XIconRef} className="opacity-0 ">
              <Image
                src="/x_icon.svg"
                alt="close icon"
                width={44}
                height={44}
                className="origin-center cursor-pointer md:cursor-default"
                priority={true}
              />
            </div>
          </div>

          <div className="absolute z-50 w-16 top-8 right-1">
            <div ref={separatorIconRef} className="opacity-0">
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
