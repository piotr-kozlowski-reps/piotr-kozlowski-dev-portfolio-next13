import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Fragment, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const OpeningPageImageRevealing = () => {
  const mainContainerRef = useRef(null);
  const imageSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.utils.toArray(".comparisonSection").forEach((section) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageSectionRef.current!,
          start: "top top",
          // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
          end: () => "+=" + imageSectionRef.current!.offsetWidth,
          markers: true,
          scrub: 4,
          // pin: true,
          // anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });
      // animate the container one way...
      tl.fromTo(
        imageSectionRef.current!.querySelector(".afterImage"),
        { xPercent: 100, x: 0 },
        { xPercent: 0 }
      )
        // ...and the image the opposite way (at the same time)
        .fromTo(
          imageSectionRef.current!.querySelector(".afterImage img"),
          { xPercent: -100, x: 0 },
          { xPercent: 0 },
          0
        );
    });
  }, []);

  // <div
  //   className="absolute h-screen bg-no-repeat bg-cover bg-center top-0 left-0 right-0 bottom-0"
  //   style={{
  //     backgroundImage: `url("/bg-landing-page.jpg")`,
  //   }}
  //   ref={mainContainerRef}
  // ></div>

  return (
    <div className="test-images">
      <section className="comparisonSection" ref={imageSectionRef}>
        <div className="comparisonImage beforeImage">
          <img src="https://assets.codepen.io/16327/before.jpg" alt="before" />
        </div>
        <div className="comparisonImage afterImage">
          <img src="https://assets.codepen.io/16327/after.jpg" alt="after" />
        </div>
      </section>
    </div>
  );
};

export default OpeningPageImageRevealing;
