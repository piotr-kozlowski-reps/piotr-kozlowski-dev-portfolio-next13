import React, { Fragment, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  children: JSX.Element;
  content: string;
};

const Tooltip = ({ children, content }: Props) => {
  ////vars
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);

  ////animations
  const onEnterHandler = (
    backgroundElement: React.RefObject<HTMLDivElement>,
    textElement: React.RefObject<HTMLSpanElement>
  ) => {
    // const tl = gsap.timeline();
    gsap.fromTo(
      backgroundElement.current,
      { autoAlpha: 0, scaleX: 0 },
      {
        autoAlpha: 1,
        scaleX: 1,
        duration: 0.3,
        delay: 0.1,
        transformOrigin: "left",
      }
    );
    gsap.fromTo(
      textElement.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 0.2, duration: 0.4 }
    );
  };

  const onLeaveHandler = (
    backgroundElement: React.RefObject<HTMLDivElement>,
    textElement: React.RefObject<HTMLSpanElement>
  ) => {
    gsap.fromTo(
      backgroundElement.current,
      { autoAlpha: 1, scaleX: 1 },
      {
        autoAlpha: 0,
        scaleX: 0,
        duration: 0.3,
        delay: 0.1,
        transformOrigin: "left",
      }
    );
    gsap.fromTo(
      textElement.current,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.4 }
    );
  };

  ////jsx
  return (
    <Fragment>
      <div className="relative">
        <div
          onMouseOver={
            content
              ? onEnterHandler.bind(null, tooltipRef, tooltipTextRef)
              : () => {}
          }
          onMouseLeave={
            content
              ? onLeaveHandler.bind(null, tooltipRef, tooltipTextRef)
              : () => {}
          }
        >
          {children}
        </div>

        <div
          className={`absolute -top-[32px] left-[50%] font-style-xs bg-background_2_darker py-2 px-4 border border-main_color border-opacity-30 shadow-input-shadow invisible bg-opacity-20`}
          ref={tooltipRef}
        >
          <span
            ref={tooltipTextRef}
            className="invisible"
            style={{ whiteSpace: "pre" }}
          >
            {content}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Tooltip;
