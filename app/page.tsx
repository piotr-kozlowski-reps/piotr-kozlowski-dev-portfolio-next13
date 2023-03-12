"use client";

import React, { Fragment, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "../components/Navigation";
import HomePageImageRevealing from "../components/homePage/HomePageImageRevealing";
import HomePageFooter from "../components/homePage/HomePageFooter";
import AboutSection from "../components/aboutPage/AboutSection";
import useScrollPositionToDefineSectionAndChangeLinks from "../hooks/useScrollPositionToDefineSectionAndChangeLinks";
import useDeviceSize from "../hooks/useDeviceSize";
import ProjectsSection from "../components/projectsPage/ProjectsSection";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  ////vars
  const [tlHomeSection, setTlHomeSection] = useState(() => gsap.timeline());
  const [tlAboutSection, setTlAboutSection] = useState(() => gsap.timeline());
  const [width, height] = useDeviceSize();

  const menuBackgroundRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const backgroundFadeRef = useRef<HTMLDivElement>(null);

  const homeSectionHPercentage = 0; //500 was to make nice home page section, needs to be reorganised to make rest of the animations possible

  /** get object defining in which section we are currently based on Scroll Y position */
  const { whichSectionIsActive } =
    useScrollPositionToDefineSectionAndChangeLinks(
      aboutRef,
      projectsRef,
      contactRef
    );

  // TODO: delete afterwards;
  useIsomorphicLayoutEffect(() => {
    projectsRef.current!.scrollIntoView();
  }, [projectsRef.current]);

  // /** Footer Pinned With ScrollTrigger */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setTlHomeSection(
        gsap.timeline({
          scrollTrigger: {
            trigger: homeRef.current,
            start: () => "top top",
            end: () => `${homeSectionHPercentage}% top`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      );
    });

    return () => ctx.revert();
  }, []);

  /** gradient on menu background when scrolling to about part */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(menuBackgroundRef.current!, {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: aboutRef.current!,
          start: () => "top-=100% top",
          end: () => "top top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  ////jsx
  return (
    <Fragment>
      {/* Fixed Navigation */}
      <div className="fixed top-0 w-screen h-screen z-max">
        <div
          className="absolute top-0 left-0 invisible w-screen h-screen z-max bg-background_2_darker right-4"
          ref={backgroundFadeRef}
        ></div>
        <div
          className="absolute z-0 w-full h-[108px] bg-gradient-to-b from-background_2_darker via-background_2_darker"
          ref={menuBackgroundRef}
        ></div>
        <div className="xl:w-[1220px] xl:h-full relative xl:mx-auto z-max">
          <Navigation
            aboutSection={aboutRef.current!}
            projectsSection={projectsRef.current!}
            contactSection={contactRef.current!}
            whichSectionIsActive={whichSectionIsActive}
            backgroundFadeRef={backgroundFadeRef.current!}
          />
        </div>
      </div>

      <section ref={homeRef} title="home_section">
        <div className="w-full h-full bg-background_1_lighter ">
          <div
            className="relative flex flex-col justify-between h-screen bg-background_1_lighter "
            style={
              {
                // backgroundImage: `url("/opening_page_mobile.png")`,
                // backgroundImage: `url("/opening_page_tablet.png")`,
                // backgroundImage: `url("/opening_page_desktop.png")`,
                // backgroundImage: `url("/opening_page___mobile_Menu.png")`,
                // backgroundImage: `url("/about_developer.png")`,
              }
            }
          >
            <HomePageImageRevealing tl={tlHomeSection} />
            <HomePageFooter />
          </div>
        </div>
      </section>

      <section title="about_section">
        <div className=" bg-background_2_darker" ref={aboutRef}>
          <AboutSection />
        </div>
      </section>

      <section title="projects_section">
        <div className=" bg-background_1_lighter" ref={projectsRef}>
          <ProjectsSection />
        </div>
      </section>

      <section title="contact_section">
        <div
          className="w-screen h-screen bg-background_2_darker"
          ref={contactRef}
        >
          contact
        </div>
      </section>

      {/* Footer Section */}
      <section title="footer_section">
        <div className="w-screen bg-background_2_darker">
          Footer
          <br />
          footer
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
