"use client";

import React, { Fragment, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "../components/ui/Navigation";
import HomePageImageRevealing from "../components/homePage/HomePageImageRevealing";
import HomePageFooter from "../components/homePage/HomePageFooter";
import AboutSection from "../components/aboutPage/AboutSection";
import useScrollPositionToDefineSectionAndChangeLinks from "../hooks/useScrollPositionToDefineSectionAndChangeLinks";
import useDeviceSize from "../hooks/useDeviceSize";
import ProjectsSection from "../components/projectsPage/ProjectsSection";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import ContactSection from "../components/contactPage/ContactSection";
import Modal from "../components/ui/Modal";
import { useModalState } from "../globalState/ModalState";
import Footer from "../components/footer/Footer";
import useShowModalWhenHeightIsTooSMall from "../hooks/useShowModalWhenProblemOccurs";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  ////vars
  const [_tlHomeSection, setTlHomeSection] = useState(() => gsap.timeline());
  const [width, height] = useDeviceSize();

  //modal
  const modalState = useModalState();
  const [isModalVisible, _setIsModalVisible] = useState(true);

  //modal when height is too small
  const modalWhenHeightIsTooSmallContent = (
    <div className="flex flex-col border-t border-main_color bg-background_1_lighter">
      <div className="mx-auto my-16 font-style-sm ">
        <p className="mx-8 text-center">
          This site was thought to consume more pixels in vertical direction.
        </p>
        <p className="mx-8 text-center">
          It needs that so badly, that looking at it, when window height is
          lower than expected, can injure your eye with painfully invisible
          content.
        </p>
      </div>
    </div>
  );
  useShowModalWhenHeightIsTooSMall(
    height,
    width,
    modalWhenHeightIsTooSmallContent
  );

  //refs
  const menuBackgroundRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const backgroundFadeRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const homeSectionHPercentage = 0; //500 was to make nice home page section, needs to be reorganized to make rest of the animations possible

  /** get object defining in which section we are currently based on Scroll Y position */
  const { whichSectionIsActive } =
    useScrollPositionToDefineSectionAndChangeLinks(
      aboutRef,
      projectsRef,
      contactRef
    );

  /** Footer Pinned With ScrollTrigger */
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

  function onCancelHandler() {
    gsap.fromTo(
      modalRef.current,
      { autoAlpha: 1, y: 0, filter: "blur(0px)" },
      {
        autoAlpha: 0,
        y: "-100vh",
        filter: "blur(20px)",
        duration: 0.3,
        onComplete: () => modalState.setIsShowModal(false),
      }
    );
  }

  ////jsx
  return (
    <Fragment>
      {/* modal */}
      {modalState.getIsShowModal() ? (
        <Modal
          show={isModalVisible}
          isError={modalState.getModalData().isError}
          onCancel={onCancelHandler}
          ref={modalRef}
        >
          {typeof modalState.getModalData().modalContent === "string" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: modalState.getModalData().modalContent as string,
              }}
            ></div>
          ) : (
            (modalState.getModalData().modalContent as JSX.Element)
          )}

          {/* to test modal look paste here below some JSX and check how it looks: */}
          {/* <div className="flex flex-col border-t border-error bg-background_1_lighter">
            <div className="mx-auto my-16 font-style-sm text-error">
              <p>Thank you. Your message has been sent.</p>
            </div>
          </div> */}
        </Modal>
      ) : null}

      {/* Fixed Navigation */}
      <div className="fixed top-0 w-screen h-32 z-100">
        <div
          className="absolute top-0 left-0 invisible w-screen h-screen z-100 bg-background_2_darker right-4"
          ref={backgroundFadeRef}
        ></div>
        <div
          className="absolute z-0 w-full h-[108px] bg-gradient-to-b from-background_2_darker via-background_2_darker"
          ref={menuBackgroundRef}
        ></div>
        <div className="relative xl:w-container xl:h-full xl:mx-auto z-100 ">
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
          <div className="relative flex flex-col justify-between h-screen bg-background_1_lighter ">
            <HomePageImageRevealing />
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
        <div className="w-screen bg-background_2_darker" ref={contactRef}>
          <ContactSection />
        </div>
      </section>

      <section title="footer_section">
        <div className="w-screen bg-background_2_darker">
          <Footer />
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
