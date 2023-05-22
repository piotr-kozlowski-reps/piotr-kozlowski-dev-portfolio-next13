import gsap from "gsap";

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
//       ease: "power4.inOut",
//       duration: duration,
//     }
//   );
// }

// // export function mouseOutHandler(ref: React.RefObject<HTMLElement>) {
// //   gsap.to(ref.current, {
// //     scale: 1,
// //     ease: "power4.inOut",
// //     duration: duration,
// //   });
// // }

/** Toggle HamburgerIcon <=> X  */
const startRef1State: gsap.TweenVars = {
  scaleY: 1,
  scaleX: 1,
  rotateZ: 0,
  autoAlpha: 100,
  transformOrigin: "35% 50%",
  immediateRender: false,
};
const endRef1State: gsap.TweenVars = {
  scaleY: 0.25,
  scaleX: 1,
  rotateZ: 140,
  autoAlpha: 0,
  transformOrigin: "35% 50%",
  ease: "power4.inOut",
  duration: 0.5,
  immediateRender: false,
};
const startRef2State: gsap.TweenVars = {
  transformOrigin: "35% 50%",
  autoAlpha: 0,
  rotateZ: 0,
  scale: 0,
  immediateRender: false,
};
const endRef2State: gsap.TweenVars = {
  transformOrigin: "35% 50%",
  autoAlpha: 100,
  rotateZ: 180,
  scale: 1,
  ease: "power4.inOut",
  duration: 0.6,
  immediateRender: false,
};
export function hamburgerIntoXAnimation(
  ref1: React.RefObject<HTMLElement>,
  ref2: React.RefObject<HTMLElement>
) {
  gsap.fromTo(ref1.current, startRef1State, endRef1State);
  gsap.fromTo(ref2.current, startRef2State, endRef2State);
}
export function XIntoHamburgerAnimation(
  ref1: React.RefObject<HTMLElement>,
  ref2: React.RefObject<HTMLElement>
) {
  gsap.fromTo(ref2.current, endRef2State, startRef2State);
  gsap.fromTo(ref1.current, endRef1State, startRef1State);
}

// /** Toggle HamburgerIcon <=> Separator  */
const startRefHamburger: gsap.TweenVars = {
  scaleY: 1,
  scaleX: 1,
  rotateZ: 0,
  x: 0,
  y: 0,
  autoAlpha: 1,
};
const endRefHamburger: gsap.TweenVars = {
  scaleY: 0.5,
  scaleX: 1,
  rotateZ: 90,
  x: -70,
  y: 10,
  opacity: 0,
  autoAlpha: 0,
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
      ease: "power4.inOut",
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
      ease: "power4.inOut",
      delay: delay,
    }
  );
}

export function hideElementsInXAnimationInitialForMobileView_Invisibly(
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
      autoAlpha: 0,
      stagger: staggerValue,
      duration: durationValue,
      ease: "power4.inOut",
      delay: delay,
    }
  );
}

export const generatePropertiesForTimelineInEveryResolution = (
  amountPixelsFromTop: number,
  trigger: React.RefObject<HTMLDivElement>
) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger.current,
      start: () => `top ${amountPixelsFromTop}px`,
      end: () => `+=350%`,
      // markers: {
      //   startColor: "#fff",
      //   endColor: "#fff",
      // },
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
};
