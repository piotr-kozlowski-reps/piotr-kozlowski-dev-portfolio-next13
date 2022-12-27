"use client";

import React, { useState } from "react";
import { gsap } from "gsap";

import Navigation from "./Navigation";

const Home = () => {
  ////vars
  const [tl, setTl] = useState(() => gsap.timeline());

  return (
    <div
      className="h-screen flex flex-col justify-between bg-background_1_lighter relative"
      style={{
        backgroundImage: `url("/opening_page_mobile.png")`,
      }}
    >
      <Navigation timeline={tl} />
    </div>
  );
};

export default Home;
