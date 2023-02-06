import Image from "next/image";
import React from "react";

const AboutTitle = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        src="aboutText.svg"
        alt="about text"
        width={1160}
        height={2000}
        className=" xl:ml-[4px] pl-[31px] pr-[31px] xl:pl-0 xl:pr-[3px]"
      />
    </div>
  );
};

export default AboutTitle;
