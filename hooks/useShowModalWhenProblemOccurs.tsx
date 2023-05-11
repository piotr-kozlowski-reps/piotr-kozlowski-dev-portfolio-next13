import { useEffect, useState } from "react";
import { useModalState } from "../globalState/ModalState";

const useShowModalWhenProblemOccurs = (
  conditionResult: boolean,
  modalContent: JSX.Element
) => {
  ////vars
  const modalState = useModalState();
  const [wasModalWarningVisible, setWasModalWarningVisible] = useState(false);

  useEffect(() => {
    if (!wasModalWarningVisible && conditionResult) {
      //show modal

      modalState.setModalData(modalContent, 0, false);
      modalState.setIsShowModal(true);
      setWasModalWarningVisible(true);
    }
  }, []);
};

export default useShowModalWhenProblemOccurs;
