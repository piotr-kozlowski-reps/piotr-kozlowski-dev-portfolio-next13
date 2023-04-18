import React from "react";
import clsx from "clsx";
import useDeviceSize from "../../hooks/useDeviceSize";

const EmailLink = () => {
  ////vars
  const [width, height, mediaSizeName] = useDeviceSize();

  const isDesktop = mediaSizeName === "desktop";

  ////jsx
  return (
    <div className="text-center">
      <a href="mailto:myemail@dev.ante.pl">
        <span
          className={clsx(
            { "mobile-link-small": !isDesktop },
            { "link lowercase": isDesktop }
          )}
        >
          myemail@dev.ante.pl
        </span>
      </a>
    </div>
  );
};

export default EmailLink;
