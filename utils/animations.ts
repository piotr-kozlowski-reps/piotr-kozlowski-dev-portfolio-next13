import { gsap } from "gsap/dist/gsap";

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
// const startRef1SeparatorState = {
//   scaleY: 1,
//   scaleX: 1,
//   rotateZ: 0,
//   x: 0,
//   y: 0,
// };
// const endRef1SeparatorState = {
//   x: -55,
//   y: -8,
//   scaleY: 0.25,
//   scaleX: 0.5,
//   rotateZ: 90,
//   ease: "Power4.easeOut",
//   duration: 1,
// };
// export function hamburgerIntoSeparatorAnimation(
//   ref1: React.RefObject<HTMLElement>,
//   ref2: React.RefObject<HTMLElement>
// ) {
//   gsap.fromTo(
//     [ref1.current, ref2.current],
//     startRef1SeparatorState,
//     endRef1SeparatorState
//   );
// }
// export function separatorIntoHamburgerAnimation(
//   ref1: React.RefObject<HTMLElement>,
//   ref2: React.RefObject<HTMLElement>
// ) {
//   gsap.fromTo(
//     [ref1.current, ref2.current],
//     endRef1SeparatorState,
//     startRef1SeparatorState
//   );
// }

// /** LandingPage timeline  */
// export function revealElementsInYAnimation(
//   refs: HTMLElement[],
//   delay: number,
//   durationValue: number,
//   staggerValue: number,
//   initialYValue: number,
//   endYValue: number
// ) {
//   return gsap.fromTo(
//     refs,
//     {
//       y: initialYValue,
//       autoAlpha: 0,
//     },
//     {
//       y: endYValue,
//       autoAlpha: 100,
//       stagger: staggerValue,
//       duration: durationValue,
//       ease: "power4.out",
//       delay: delay,
//     }
//   );
// }

// export function hideElementsInYAnimation(
//   refs: HTMLElement[],
//   delay: number,
//   durationValue: number,
//   staggerValue: number,
//   initialXValue: number,
//   endXValue: number
// ) {
//   return gsap.fromTo(
//     refs,
//     {
//       y: initialXValue,
//       autoAlpha: 100,
//     },
//     {
//       y: endXValue,
//       autoAlpha: 0,
//       stagger: staggerValue,
//       duration: durationValue,
//       ease: "power4.out",
//       delay: delay,
//     }
//   );
// }

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
