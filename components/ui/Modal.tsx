import React, { Fragment } from "react";
import Backdrop from "./Backdrop";

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  children: JSX.Element;
}

const ModalOverlay = (props: ModalProps) => {
  return (
    <div className="fixed ml-8 mr-[24px] z-200 top-1/3 left-0 right-0">
      {props.children}
      <button className="w-full button-fill" onClick={props.onCancel}>
        hide
      </button>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return (
    <Fragment>
      {props.show ? <Backdrop onClick={props.onCancel} /> : null}
      <ModalOverlay {...props} />
    </Fragment>
  );
};

export default Modal;
