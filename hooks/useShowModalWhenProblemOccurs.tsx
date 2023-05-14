import { useEffect, useState } from "react";
import { useModalState } from "../globalState/ModalState";

const useShowModalWhenHeightIsTooSMall = (
  height: number,
  width: number,
  modalContent: JSX.Element
) => {
  ////vars
  const modalState = useModalState();
  const [wasModalWarningVisible, setWasModalWarningVisible] = useState(false);

  useEffect(() => {
    const isforDesktopsMinimalHeightIs720px =
      !wasModalWarningVisible && height !== 0 && height <= 720 && width > 768;

    const isforMobileMinimalHeightIs600px =
      !wasModalWarningVisible && height !== 0 && height <= 600 && width <= 768;

    if (isforDesktopsMinimalHeightIs720px || isforMobileMinimalHeightIs600px) {
      //show modal
      modalState.setModalData(modalContent, 0, false);
      modalState.setIsShowModal(true);
      setWasModalWarningVisible(true);
    }
  }, [height, width]);
};

export default useShowModalWhenHeightIsTooSMall;
