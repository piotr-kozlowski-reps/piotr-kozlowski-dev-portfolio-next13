import { useEffect, useState } from "react";
import { TMediaSizeNames } from "../types/typings";

/**hook that constantly returns window resolution changes
 * return:
 * width: number
 * height: number
 * mediaSizeName: "mobile" | "tablet" | "desktop"
 */
const useDeviceSize = (): [number, number, TMediaSizeNames] => {
  ////vars
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mediaSizeName, setMediaSizeName] = useState<TMediaSizeNames>("tablet");

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMediaSizeName("mobile");
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1224) {
      setMediaSizeName("tablet");
    }

    if (window.innerWidth >= 1224) {
      setMediaSizeName("desktop");
    }
  }, [width, height]);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height, mediaSizeName];
};
export default useDeviceSize;
