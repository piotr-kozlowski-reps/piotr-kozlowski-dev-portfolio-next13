"use client";

import React from "react";
import { TAddSliderToAnimation, TSliderData } from "../../types/typings";
import AboutSliderStripe from "./AboutSliderStripe";

type Props = {
  sliderData: TSliderData;
  addSliderElement: TAddSliderToAnimation;
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
