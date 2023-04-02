import React, { forwardRef, Fragment, useLayoutEffect, useRef } from "react";
import Backdrop from "./Backdrop";
import gsap from "gsap";

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  children: JSX.Element;
}

gsap.registerPlugin();
const ModalOverlay = forwardRef(
  (props: ModalProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    ////vars
    const modalRef = useRef<HTMLDivElement>(null);
    const modalCTAButtonRef = useRef<HTMLButtonElement>(null);
    // ref = modalRef;

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
        className="fixed ml-8 mr-[24px] z-200 top-[226px] md:top-[256px] left-0 right-0  md:w-[566px] md:ml-auto md:mr-auto"
        ref={ref}
      >
        <div ref={modalRef}>
          {props.children}
          <button
            className="invisible w-full button-fill"
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

export default Modal;
