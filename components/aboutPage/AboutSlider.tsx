"use client";

import React from "react";
import { TMediaSizeNames, TSliderData } from "../../types/typings";
import AboutSliderStripe from "./AboutSliderStripe";

type Props = {
  sliderData: TSliderData;
  mediaSizeName?: TMediaSizeNames;
  isAnimateStripes: boolean;
};

const AboutSlider = (props: Props) => {
  ////vars
  const { mainTitle, additionalInfo, percentage } = props.sliderData;
  const { mediaSizeName, isAnimateStripes } = props;

  ////jsx
  {
    return additionalInfo ? (
      <div
        className={`flex mb-[25px] md:mb-8 flex-col ${
          mediaSizeName === "desktop"
            ? "items-start justify-center"
            : "items-center justify-center"
        }`}
      >
        <div className="font-style-h4">{mainTitle}</div>
        <div className="-mt-1 font-style-xs">{additionalInfo}</div>
        <AboutSliderStripe
          percentage={percentage}
          isAnimateStripes={isAnimateStripes}
        />
      </div>
    ) : (
      <div
        className={`flex mb-8 flex-col ${
          mediaSizeName === "desktop"
            ? "items-start justify-center"
            : "items-center justify-center"
        }`}
      >
        <div className="font-style-h4">{mainTitle}</div>
        <AboutSliderStripe
          percentage={percentage}
          isAnimateStripes={isAnimateStripes}
        />
      </div>
    );
  }
};

export default AboutSlider;
