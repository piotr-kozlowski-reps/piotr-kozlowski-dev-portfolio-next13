"use client";

import React from "react";
import { SliderData } from "../../types/typings";
import AboutSliderStripe from "./AboutSliderStripe";

type Props = {
  sliderData: SliderData;
  addSliderElement: (el: React.RefObject<HTMLDivElement>) => void;
};

const AboutSlider = (props: Props) => {
  ////vars
  const { mainTitle, additionalInfo, percentage } = props.sliderData;
  const { addSliderElement } = props;

  ////jsx
  {
    return additionalInfo ? (
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="font-style-h4">{mainTitle}</div>
        <div className="-mt-1 font-style-sm">{additionalInfo}</div>
        <AboutSliderStripe
          percentage={percentage}
          addSliderElement={addSliderElement}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="font-style-h4">{mainTitle}</div>
        <AboutSliderStripe
          percentage={percentage}
          addSliderElement={addSliderElement}
        />
      </div>
    );
  }
};

export default AboutSlider;
