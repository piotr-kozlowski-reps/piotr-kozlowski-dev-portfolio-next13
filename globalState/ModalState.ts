import { hookstate, useHookstate } from "@hookstate/core";
import { devtools } from "@hookstate/devtools";
import { TModalState } from "../types/typings";

const modalStateData: TModalState = {
  isShowModal: true,
  modalContent: "",
  defaultErrorModalContent:
    '<div class="flex flex-col border-t border-main_color bg-background_1_lighter">\r\n            <div class="mx-auto my-16 font-style-sm ml-8 mr-[24px] text-center">\r\n              Unfortunately, not enough data provided or occurred some error,\r\n              please try again.\r\n            </div>\r\n          </div>',
};
const modalState = hookstate(modalStateData, devtools({ key: "modalState" }));

export function useModalState() {
  const state = useHookstate(modalState);

  return {
    getIsShowModal() {
      return state.isShowModal.get();
    },
    setIsShowModal(isShowModal: boolean) {
      state.isShowModal.set(isShowModal);
    },
    getModalContent() {
      return state.modalContent.get();
    },
    setModalContent(modalContent: string) {
      state.modalContent.set(modalContent);
    },
    getDefaultErrorModalContent() {
      return state.defaultErrorModalContent.get();
    },
  };
}
