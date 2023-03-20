import { hookstate, useHookstate } from "@hookstate/core";
import { devtools } from "@hookstate/devtools";
import { TModalsChooser, TModalState } from "../types/typings";

const modalStateData: TModalState = {
  isShowModal: true,
  modalChooser: null,
};
const modalState = hookstate(modalStateData, devtools({ key: "modalState" }));

export function useModalState() {
  const state = useHookstate(modalState);

  // This function wraps the state by an interface,
  // i.e. the state link is not accessible directly outside of this module.
  // The state for tasks in TasksState.ts exposes the state directly.
  // Both options are valid and you need to use one or another,
  // depending on your circumstances. Apply your engineering judgement
  // to choose the best option. If unsure, exposing the state directly
  // like it is done in the TasksState.ts is a safe bet.
  return {
    getIsShowModal() {
      return state.isShowModal;
    },
    setIsShowModal(isShowModal: boolean) {
      state.isShowModal.set(isShowModal);
    },
    getModalChooser() {
      return state.modalChooser;
    },
    setModalContent(content: TModalsChooser) {
      state.modalChooser.set(content);
    },
  };
}
