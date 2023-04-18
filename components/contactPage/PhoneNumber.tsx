import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import useDeviceSize from "../../hooks/useDeviceSize";

const PhoneNumber = () => {
  ////vars
  const [width, height, mediaSizeName] = useDeviceSize();
  const [phoneDetails, setPhoneDetails] = useState({
    phoneLink: "/",
    phoneNumberDisplaying: "+48 ... show number",
    isClicked: false,
  });

  const firstClickToDisplayRealPhoneNumberHandler = () => {
    if (!phoneDetails.isClicked) {
      setPhoneDetails({
        phoneLink: "tel:+48691235259",
        phoneNumberDisplaying: "+48 691 235 259",
        isClicked: true,
      });
    }
  };

  const isDesktop = mediaSizeName === "desktop";

  ////jsx
  return (
    <div
      className="-mt-[1px] text-center"
      onClick={firstClickToDisplayRealPhoneNumberHandler}
    >
      <Link href={phoneDetails.phoneLink}>
        <span
          className={clsx(
            { "mobile-link-small": !isDesktop },
            { "link lowercase": isDesktop }
          )}
        >
          {phoneDetails.phoneNumberDisplaying}
        </span>
      </Link>
    </div>
  );
};

export default PhoneNumber;
