import { useEffect, useState } from "react";
import { WhichSectionIsActive } from "../types/typings";

const useScrollPositionToDefineSectionAndChangeLinks = (
  aboutRef: React.RefObject<HTMLDivElement>,
  projectsRef: React.RefObject<HTMLDivElement>,
  contactRef: React.RefObject<HTMLDivElement>
) => {
  const [whichSectionIsActive, setWhichSectionIsActive] =
    useState<WhichSectionIsActive>({
      home: true,
      about: false,
      projects: false,
      contact: false,
    });

  function defineTopYScrollValueOfElementInDOM(
    el: HTMLDivElement | null
  ): number | null {
    return el ? el.getBoundingClientRect().top + window.scrollY : null;
  }

  const checkWhatSectionIsActive = () => {
    let scrollYPosition = window.scrollY;

    const aboutTopPosition = defineTopYScrollValueOfElementInDOM(
      aboutRef.current
    );
    const projectsTopPosition = defineTopYScrollValueOfElementInDOM(
      projectsRef.current
    );
    const contactTopPosition = defineTopYScrollValueOfElementInDOM(
      contactRef.current
    );

    if (aboutTopPosition && projectsTopPosition && contactTopPosition) {
      //homeSection
      if (scrollYPosition < aboutTopPosition) {
        setWhichSectionIsActive({
          home: true,
          about: false,
          projects: false,
          contact: false,
        });
      }

      //aboutSection
      if (
        scrollYPosition >= aboutTopPosition &&
        scrollYPosition < projectsTopPosition
      ) {
        setWhichSectionIsActive({
          home: false,
          about: true,
          projects: false,
          contact: false,
        });
      }

      //projectsSection
      if (
        scrollYPosition >= projectsTopPosition &&
        scrollYPosition < contactTopPosition
      ) {
        setWhichSectionIsActive({
          home: false,
          about: false,
          projects: true,
          contact: false,
        });
      }

      //contactSection
      if (scrollYPosition >= contactTopPosition) {
        setWhichSectionIsActive({
          home: false,
          about: false,
          projects: false,
          contact: true,
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      checkWhatSectionIsActive();
    });
  }, []);

  return { whichSectionIsActive };
};

export default useScrollPositionToDefineSectionAndChangeLinks;
