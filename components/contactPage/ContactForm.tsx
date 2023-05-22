import React, { FormEvent, Fragment, useRef, useState } from "react";
import {
  Reducer_Action,
  REDUCER_ACTION_TYPE,
  useFormInput,
} from "../../hooks/useFormInput";
import InputField from "../ui/InputField";
import {
  checkIfNotEmpty,
  checkIfIsEmail,
} from "../../utils/formInputsChecking";
import { useModalState } from "../../globalState/ModalState";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import clsx from "clsx";
import useDeviceSize from "../../hooks/useDeviceSize";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ContactForm = () => {
  ////vars
  const modalState = useModalState();
  const [_width, _height, mediaSizeName] = useDeviceSize();
  const [isLoading, setIsLoading] = useState(false);

  const [nameInput, nameDispatch] = useFormInput(
    { inputValue: "" },
    checkIfNotEmpty,
    "Name is required."
  );
  const [emailInput, emailDispatch] = useFormInput(
    { inputValue: "" },
    checkIfIsEmail,
    "The email provided has the wrong format."
  );
  const [messageInput, messageDispatch] = useFormInput(
    { inputValue: "" },
    checkIfNotEmpty,
    "Message is required."
  );

  //refs
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactGETINTOUCHRef = useRef<HTMLParagraphElement>(null);
  const contactSmallAdditionTextRef = useRef<HTMLParagraphElement>(null);
  const nameInputRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLDivElement>(null);

  //animation
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // timeline
    function createTl(ref: React.RefObject<HTMLDivElement>) {
      return gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: () => "top center",
          end: () => "bottom 95%",
          // markers: true,
          // scrub: 0.8,
          // pin: true,
          invalidateOnRefresh: true,
          toggleActions: "play reverse play reverse",
        },
        ease: "power4.inOut",
      });
    }

    // animation
    const animate = (tl: gsap.core.Timeline) => {
      tl.addLabel("start")
        .fromTo(
          contactFormRef.current,
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0, duration: 0.2 }
        )
        .fromTo(
          [contactGETINTOUCHRef.current, contactSmallAdditionTextRef.current],
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0, duration: 0.15, stagger: 0.05 },
          "start"
        )
        .fromTo(
          [
            nameInputRef.current,
            emailInputRef.current,
            messageInputRef.current,
          ],
          { autoAlpha: 0, x: "100vw" },
          { autoAlpha: 1, x: 0, duration: 0.15, stagger: 0.05 },
          "start+=0.1"
        );
    };

    mm.add("(max-width: 768px)", () => {
      const tl = createTl(contactFormRef);
      animate(tl);
    });
    mm.add("(min-width: 769px) and (max-width: 1223px)", () => {
      const tl = createTl(contactFormRef);
      animate(tl);
    });

    mm.add("(min-width: 1224px)", () => {
      const tl = createTl(contactFormRef);
      animate(tl);
    });

    //clear and revert
    return () => {
      mm.revert();
    };
  }, []);

  ////logic
  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameInput.inputValue,
            email: emailInput.inputValue,
            message: messageInput.inputValue,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.message) {
        showModalWithPositiveInfo(data.message);
        clearFormInputs();
      } else {
        showModalWithNegativeInfo(data.message || "");
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      showModalWithNegativeInfo("Some error has occurred.");
    }
  }

  function showModalWithPositiveInfo(message: string) {
    const modalContent = (
      <div className="flex flex-col border-t border-main_color bg-background_1_lighter">
        <div className="mx-auto my-16 font-style-sm">
          <p>{message}</p>
        </div>
      </div>
    );
    modalState.setModalData(modalContent, 2500, false);
    modalState.setIsShowModal(true);
  }

  function showModalWithNegativeInfo(message: string) {
    const modalContent = (
      <div className="flex flex-col border-t border-error bg-background_1_lighter">
        <div className="mx-auto my-16 font-style-sm text-error">
          <p>{message}</p>
        </div>
      </div>
    );

    modalState.setModalData(modalContent, 2500, true);
    modalState.setIsShowModal(true);
  }

  const inputDispatcher = (
    value: string,
    dispatcher: React.Dispatch<Reducer_Action>
  ) => {
    dispatcher({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
    dispatcher({
      type: REDUCER_ACTION_TYPE.SET_INPUT_STATE,
      payload: value,
    });
  };

  function clearFormInputs() {
    nameDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    emailDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    messageDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
  }

  //is send button enabled
  const isDirty =
    nameInput.isDirty && emailInput.isDirty && messageInput.isDirty;
  const isValid =
    nameInput.isValid && emailInput.isValid && messageInput.isValid;
  const isEnabled = isDirty && isValid;

  ////jsx
  return (
    <Fragment>
      <div
        className={clsx(
          "flex flex-col items-center justify-center w-full h-full overflow-x-hidden overflow-y-hidden md:w-container_small md:mx-auto",
          { "pt-[206px]": mediaSizeName === "desktop" },
          { "pt-[172px]": mediaSizeName !== "desktop" }
        )}
        ref={contactFormRef}
      >
        <div className="w-full mb-8 ml-16">
          <p className="font-style-h3" ref={contactGETINTOUCHRef}>
            GET IN TOUCH
          </p>
          <p
            className="font-style-xs -mt-[4px] mb-[22px]"
            ref={contactSmallAdditionTextRef}
          >
            an idea? a question? a project to help with?
          </p>
        </div>
        <div className="w-full ml-16">
          <form onSubmit={formSubmitHandler}>
            <InputField
              id="name"
              name="Name:"
              placeholder="enter your name"
              value={nameInput.inputValue}
              onChange={(e) => {
                inputDispatcher(e.target.value, nameDispatch);
              }}
              onBlur={(_e) => {
                nameDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
              }}
              inputData={nameInput}
              ref={nameInputRef}
            />
            <InputField
              id="email"
              name="E-mail:"
              placeholder="enter your e-mail"
              value={emailInput.inputValue}
              onChange={(e) => {
                inputDispatcher(e.target.value, emailDispatch);
              }}
              onBlur={(_e) => {
                emailDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
              }}
              inputData={emailInput}
              ref={emailInputRef}
            />

            <InputField
              id="message"
              name="Message:"
              isTextarea={true}
              placeholder="enter your message"
              value={messageInput.inputValue}
              onChange={(e) => {
                inputDispatcher(e.target.value, messageDispatch);
              }}
              onBlur={(_e) => {
                messageDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
              }}
              inputData={messageInput}
              ref={messageInputRef}
            />

            <button
              type="submit"
              className="w-[calc(100%-64px)] button-fill disabled:cursor-default mt-8"
              disabled={!isEnabled || isLoading}
            >
              {isLoading ? (
                <span className="loader">
                  <span className="text-main_white_50">load</span>
                </span>
              ) : (
                "send"
              )}
            </button>
          </form>
        </div>
        <div className="h-[50vh]"></div>
      </div>
    </Fragment>
  );
};

export default ContactForm;
