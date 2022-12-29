import { gsap, Power4 } from "gsap";

// export function mouseEventsAnimationHandler(
//   ref: React.RefObject<HTMLElement>,
//   initialScale: number,
//   endScale: number,
//   duration: number
// ) {
//   gsap.fromTo(
//     ref.current,
//     { scale: initialScale },
//     {
//       scale: endScale,
//       ease: "Power4.easeOut",
//       duration: duration,
//     }
//   );
// }

// // export function mouseOutHandler(ref: React.RefObject<HTMLElement>) {
// //   gsap.to(ref.current, {
// //     scale: 1,
// //     ease: "Power4.easeOut",
// //     duration: duration,
// //   });
// // }

// /** Toggle HamburgerIcon <=> X  */
// const startRef1State = { scaleY: 1, scaleX: 1, rotateZ: 0 };
// const endRef1State = {
//   scaleY: 0.25,
//   scaleX: 1.1,
//   rotateZ: 45,
//   ease: "Power4.easeOut",
//   duration: 0.5,
// };
// const startRef2State = { scaleY: 1, scaleX: 1, rotateZ: 0, autoAlpha: 0 };
// const endRef2State = {
//   autoAlpha: 100,
//   scaleY: 0.25,
//   scaleX: 1.1,
//   rotateZ: 135,
//   ease: "Power4.easeOut",
//   duration: 0.5,
// };
// export function hamburgerIntoXAnimation(
//   ref1: React.RefObject<HTMLElement>,
//   ref2: React.RefObject<HTMLElement>
// ) {
//   gsap.fromTo(ref1.current, startRef1State, endRef1State);
//   gsap.fromTo(ref2.current, startRef2State, endRef2State);
// }
// export function XIntoHamburgerAnimation(
//   ref1: React.RefObject<HTMLElement>,
//   ref2: React.RefObject<HTMLElement>
// ) {
//   gsap.fromTo(ref1.current, endRef1State, startRef1State);
//   gsap.fromTo(ref2.current, endRef2State, startRef2State);
// }

// /** Toggle HamburgerIcon <=> Separator  */
const startRefHamburger: gsap.TweenVars = {
  scaleY: 1,
  scaleX: 1,
  rotateZ: 0,
  x: 0,
  y: 0,
  opacity: 1,
};
const endRefHamburger: gsap.TweenVars = {
  scaleY: 0.5,
  scaleX: 1,
  rotateZ: 90,
  x: -70,
  y: 10,
  opacity: 0,
};

const startRefSeparator: gsap.TweenVars = {
  x: 0,
  opacity: 0,
};
const endRefSeparator: gsap.TweenVars = {
  x: -60,
  opacity: 1,
};

export function hamburgerIntoSeparatorAnimation(
  refHamburger: React.RefObject<HTMLElement>,
  refSeparator: React.RefObject<HTMLElement>
) {
  gsap.fromTo([refHamburger.current], startRefHamburger, endRefHamburger);
  gsap.fromTo([refSeparator.current], startRefSeparator, endRefSeparator);
}
export function separatorIntoHamburgerAnimation(
  refHamburger: React.RefObject<HTMLElement>,
  refSeparator: React.RefObject<HTMLElement>
) {
  gsap.fromTo([refHamburger.current], endRefHamburger, startRefHamburger);
  gsap.fromTo([refSeparator.current], endRefSeparator, startRefSeparator);
}

/** LandingPage timeline  */
export function revealElementsInXAnimation(
  refs: (HTMLDivElement | HTMLLIElement)[],
  delay: number,
  durationValue: number,
  staggerValue: number,
  initialXValue: number,
  endXValue: number
) {
  return gsap.fromTo(
    refs,
    {
      x: initialXValue,
      autoAlpha: 0,
    },
    {
      x: endXValue,
      autoAlpha: 100,
      stagger: staggerValue,
      duration: durationValue,
      ease: Power4.easeOut,
      delay: delay,
    }
  );
}

export function hideElementsInXAnimation(
  refs: (HTMLDivElement | HTMLLIElement)[],
  delay: number,
  durationValue: number,
  staggerValue: number,
  initialXValue: number,
  endXValue: number
) {
  return gsap.fromTo(
    refs,
    {
      x: initialXValue,
      autoAlpha: 100,
    },
    {
      x: endXValue,
      autoAlpha: 0,
      stagger: staggerValue,
      duration: durationValue,
      ease: Power4.easeOut,
      delay: delay,
    }
  );
}

// export function fullyCustomizableAnimationWithPassedTimeline(
//   refs: HTMLElement[],
//   timeline: gsap.core.Timeline,
//   initialAnimationObject: gsap.TweenVars,
//   endAnimationObject: gsap.TweenVars
// ) {
//   return timeline.fromTo(
//     refs,
//     { ...initialAnimationObject },
//     {
//       ...endAnimationObject,
//     }
//   );
// }
