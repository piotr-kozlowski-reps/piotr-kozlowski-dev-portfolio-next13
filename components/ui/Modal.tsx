import React, { forwardRef, Fragment, useLayoutEffect, useRef } from "react";
import Backdrop from "./Backdrop";
import gsap from "gsap";
import clsx from "clsx";
import useDeviceSize from "../../hooks/useDeviceSize";

interface ModalProps {
  isError: boolean;
  show: boolean;
  onCancel: () => void;
  children: JSX.Element;
}

gsap.registerPlugin();
const ModalOverlay = forwardRef(
  (props: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    ////vars
    const [_width, height, _mediaSizeName] = useDeviceSize();
    const modalRef = useRef<HTMLDivElement>(null);
    const modalCTAButtonRef = useRef<HTMLButtonElement>(null);

    ////animation
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.addLabel("start")
          .fromTo(
            modalRef.current,
            { autoAlpha: 0, y: -250, filter: "blur(20px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
            "start"
          )
          .fromTo(
            modalCTAButtonRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8 },
            "start"
          );
      });

      return () => {
        ctx.revert();
      };
    }, []);

    ////jsx
    return (
      <div
        className={clsx(
          "fixed ml-8 mr-[24px] z-200  left-0 right-0 md:w-[566px] md:ml-auto md:mr-auto",
          { "top-[64px] md:top-[64px]": height <= 720 },
          { "top-[226px] md:top-[256px]": height > 721 }
        )}
        ref={ref}
        data-testid="modal"
      >
        <div ref={modalRef} data-testid="modal-inside">
          {props.children}
          <button
            className={clsx(
              "invisible w-full",
              { "button-fill": !props.isError },
              { "button-error": props.isError }
            )}
            onClick={props.onCancel}
            ref={modalCTAButtonRef}
          >
            hide
          </button>
        </div>
      </div>
    );
  }
);

/* eslint-disable react/display-name */
const Modal = forwardRef(
  (props: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    ////jsx
    return (
      <Fragment>
        {props.show ? <Backdrop onClick={props.onCancel} /> : null}
        <ModalOverlay {...props} ref={ref} />
      </Fragment>
    );
  }
);

Modal.displayName = "Modal";
ModalOverlay.displayName = "ModalOverlay";
export default Modal;
