import { useEffect, useState } from "react";

/**hook that constantly returns window resolution changes */
const useDeviceSize = () => {
  ////vars
  const [width, setWidth] = useState(0);
  const [heigh, setHeigh] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeigh(window.innerHeight);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, heigh];
};
export default useDeviceSize;
