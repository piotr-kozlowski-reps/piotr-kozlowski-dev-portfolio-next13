import { hookstate, useHookstate } from "@hookstate/core";
import { devtools } from "@hookstate/devtools";
import { useIsomorphicLayoutEffect } from "@react-spring/web";
import { TModalState } from "../types/typings";

const modalStateData: TModalState = {
  isShowModal: false,
  modalContent: "",
  defaultErrorModalContent:
    '<div class="flex flex-col border-t border-main_color bg-background_1_lighter">\r\n            <div class="mx-auto my-16 font-style-sm ml-8 mr-[24px] text-center">\r\n              Unfortunately, not enough data provided or occurred some error,\r\n              please try again.\r\n            </div>\r\n          </div>',
  timeoutInMilliseconds: 0,
  isError: false,
};
const modalState = hookstate(modalStateData, devtools({ key: "modalState" }));

export function useModalState() {
  const state = useHookstate(modalState);

  const delay = state.timeoutInMilliseconds.get();
  useIsomorphicLayoutEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id: NodeJS.Timeout = setTimeout(() => {
      state.timeoutInMilliseconds.set(0);
      state.isShowModal.set(false);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [delay]);

  return {
    getIsShowModal() {
      return state.isShowModal.get();
    },
    setIsShowModal(isShowModal: boolean) {
      state.isShowModal.set(isShowModal);
    },
    getModalData() {
      return {
        modalContent: state.modalContent.get({ noproxy: true }),
        defaultErrorModalContent: state.defaultErrorModalContent.get(),
        isError: state.isError.get(),
      };
    },
    /**
     *
     * @param modalContent - what will be shown inside modal
     * @param timeoutInMilliseconds - if you want modal to disappear after a while, provide here time in milliseconds, when 0 - modal will not disappear
     * @param isError - when true, button closing error will be red, otherwise main-color
     */
    setModalData(
      modalContent: string | JSX.Element,
      timeoutInMilliseconds: number,
      isError: boolean
    ) {
      state.modalContent.set(modalContent),
        state.timeoutInMilliseconds.set(timeoutInMilliseconds),
        state.isError.set(isError);
    },

    // getModalContent() {
    //   return state.modalContent.get({ noproxy: true });
    // },
    // setModalContent(modalContent: string | JSX.Element) {
    //   state.modalContent.set(modalContent);
    // },
    // setModalTimeout(timeoutInMilliseconds: number) {
    //   state.timeoutInMilliseconds.set(timeoutInMilliseconds);
    // },
    // getDefaultErrorModalContent() {
    //   return state.defaultErrorModalContent.get();
    // },
    // setIsError(modalContent: string | JSX.Element) {
    //   state.modalContent.set(modalContent);
    // },
    // setIsError(timeoutInMilliseconds: number) {
    //   state.timeoutInMilliseconds.set(timeoutInMilliseconds);
    // },
  };
}
