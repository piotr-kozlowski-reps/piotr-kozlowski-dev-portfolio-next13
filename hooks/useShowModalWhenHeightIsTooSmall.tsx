import { useEffect, useState } from "react";
import { useModalState } from "../globalState/ModalState";

const useShowModalWhenHeightIsTooSmall = (height: number) => {
  ////vars
  const modalState = useModalState();
  const [wasTooSmallHeightWarningVisible, setWasTooSmallHeightWarningVisible] =
    useState(false);

  useEffect(() => {
    if (!wasTooSmallHeightWarningVisible && height !== 0 && height <= 720) {
      //show modal
      const modalContent = (
        <div className="flex flex-col border-t border-main_color bg-background_1_lighter">
          <div className="mx-auto my-16 font-style-sm ">
            <p className="mx-8 text-center">
              This site was thought to consume more pixels in vertical
              direction.
            </p>
            <p className="mx-8 text-center">
              It needs that so badly, that looking at it, when window height is
              lower than 720 pixels, can injure your eye with painfully
              invisible content.
            </p>
          </div>
        </div>
      );
      modalState.setModalData(modalContent, 0, false);
      modalState.setIsShowModal(true);
      setWasTooSmallHeightWarningVisible(true);
    }
  }, [height]);
};

export default useShowModalWhenHeightIsTooSmall;
