"use client";

import React, {
  Fragment,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap, { Power4 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "../components/Navigation";
import HomePageImageRevealing from "../components/homePage/HomePageImageRevealing";
import HomePageFooter from "../components/homePage/HomePageFooter";
import AboutTitle from "../components/aboutPage/AboutTitle";
import useScrollPositionToDefineSectionAndChangeLinks from "../hooks/useScrollPositionToDefineSectionAndChangeLinks";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  ////vars
  const [tl, setTl] = useState(() => gsap.timeline());
  const [openingPageProgress, setOpeningPageProgress] = useState(0);

  let menuBackgroundRef = useRef<HTMLDivElement>(null);
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  /** get object defining in which section we are currently based on Scroll Y position */
  const { whichSectionIsActive } =
    useScrollPositionToDefineSectionAndChangeLinks(
      aboutRef,
      projectsRef,
      contactRef
    );

  // /** Footer Pinned With ScrollTrigger */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setTl(
        gsap.timeline({
          scrollTrigger: {
            trigger: homeSectionRef.current,
            start: "top top",
            end: "500% top",
            pin: true,
            scrub: 0.8,
            // markers: true,
            onUpdate: (self) => {
              setOpeningPageProgress(Math.floor(self.progress * 100));
            },
          },
        })
      );
    });

    return () => ctx.revert();
  }, []);

  /** gradient on menu background when scrolling to about part */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(menuBackgroundRef.current!, {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: aboutRef.current!,
          start: "top-=100% top",
          end: "top top",
          scrub: 0.7,
          // markers: true,
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
          className="absolute z-0 w-full h-[108px] bg-gradient-to-b from-background_2_darker via-background_2_darker"
          ref={menuBackgroundRef}
        ></div>
        <div className="xl:w-[1220px] xl:h-full relative xl:mx-auto z-10">
          <Navigation
            aboutSection={aboutRef.current!}
            projectsSection={projectsRef.current!}
            contactSection={contactRef.current!}
            whichSectionIsActive={whichSectionIsActive}
          />
        </div>
      </div>

      {/* Home Section */}
      <section ref={homeSectionRef} title="home">
        <div className="w-full h-full bg-background_1_lighter">
          <div
            className="relative flex flex-col justify-between h-screen bg-background_1_lighter"
            style={
              {
                // backgroundImage: `url("/opening_page_mobile.png")`,
                // backgroundImage: `url("/opening_page_tablet.png")`,
                // backgroundImage: `url("/opening_page_desktop.png")`,
                // backgroundImage: `url("/opening_page___mobile_Menu.png")`,
              }
            }
          >
            <HomePageImageRevealing tl={tl} />
            <HomePageFooter />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section title="about">
        <div
          className="w-screen h-screen bg-background_2_darker"
          ref={aboutRef}
        >
          <AboutTitle />
        </div>
      </section>

      {/* Projects Section */}
      <section title="projects">
        <div
          className="w-screen h-screen bg-background_2_darker"
          ref={projectsRef}
        >
          projects
        </div>
      </section>

      {/* Contact Section */}
      <section title="contact">
        <div
          className="w-screen h-screen bg-background_2_darker"
          ref={contactRef}
        >
          contact
        </div>
      </section>

      {/* Footer Section */}
      <section title="finalFooter">
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
