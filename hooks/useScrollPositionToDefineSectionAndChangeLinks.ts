import { useEffect, useState } from "react";
import { WhichSectionIsActive } from "../types/typings";
import { defineTopPositionValueOfElementInDOM } from "../utils/scrollUtils";

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

  const checkWhatSectionIsActive = () => {
    let scrollYPosition = window.scrollY;

    const aboutTopPosition = defineTopPositionValueOfElementInDOM(
      aboutRef.current
    );
    const projectsTopPosition = defineTopPositionValueOfElementInDOM(
      projectsRef.current
    );
    const contactTopPosition = defineTopPositionValueOfElementInDOM(
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
