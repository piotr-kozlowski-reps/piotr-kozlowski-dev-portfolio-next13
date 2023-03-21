import { hookstate, useHookstate } from "@hookstate/core";
import { devtools } from "@hookstate/devtools";
import { TModalsChooser, TModalState } from "../types/typings";

const modalStateData: TModalState = {
  isShowModal: true,
};
const modalState = hookstate(modalStateData, devtools({ key: "modalState" }));

export function useModalState() {
  const state = useHookstate(modalState);

  // This function wraps the state by an interface,
  // i.e. the state link is not accessible directly outside of this module.

  return {
    getIsShowModal() {
      return state.isShowModal.get();
    },
    setIsShowModal(isShowModal: boolean) {
      state.isShowModal.set(isShowModal);
    },
  };
}
