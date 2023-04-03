import React, { ChangeEvent, FormEvent } from "react";
import { REDUCER_ACTION_TYPE, useFormInput } from "../../hooks/useFormInput";
import InputField from "../ui/InputField";
import {
  checkIfNotEmpty,
  checkIfIsEmail,
} from "../../utils/formInputsChecking";
import { useModalState } from "../../globalState/ModalState";
import useTimeout from "../../hooks/useTimeout";

const ContactForm = () => {
  ////vars
  const modalState = useModalState();

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

  ////logic
  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
    } catch (error) {
      console.error(error);
      showModalWithNegativeInfo("Some error has occurred.");
    }
  }

  function showModalWithPositiveInfo(message: string) {
    modalState.setModalContent("<div>text from JSX.Element</div>");
    modalState.setIsShowModal(true);

    // console.log("showModalWithPositiveInfo");
    // console.log(message);
  }

  function showModalWithNegativeInfo(message: string) {
    console.log("showModalWithNegativeInfo");
    console.log(message);
  }

  function clearFormInputs() {
    nameDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    emailDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    messageDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
  }

  //is send button enaibled
  const isDirty =
    nameInput.isDirty && emailInput.isDirty && messageInput.isDirty;
  const isValid =
    nameInput.isValid && emailInput.isValid && messageInput.isValid;
  const isEnabled = isDirty && isValid;

  ////jsx
  return (
    <form onSubmit={formSubmitHandler}>
      <InputField
        id="name"
        name="Name:"
        placeholder="enter your name"
        value={nameInput.inputValue}
        onChange={(e) => {
          nameDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
          nameDispatch({
            type: REDUCER_ACTION_TYPE.SET_INPUT_STATE,
            payload: e.target.value,
          });
        }}
        onBlur={(e) => {
          nameDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
        }}
        inputData={nameInput}
      />
      <InputField
        id="email"
        name="E-mail:"
        placeholder="enter your e-mail"
        value={emailInput.inputValue}
        onChange={(e) => {
          emailDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
          emailDispatch({
            type: REDUCER_ACTION_TYPE.SET_INPUT_STATE,
            payload: e.target.value,
          });
        }}
        onBlur={(e) => {
          emailDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
        }}
        inputData={emailInput}
      />

      <InputField
        id="message"
        name="Message:"
        isTextarea={true}
        placeholder="enter your message"
        value={messageInput.inputValue}
        onChange={(e) => {
          messageDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
          messageDispatch({
            type: REDUCER_ACTION_TYPE.SET_INPUT_STATE,
            payload: e.target.value,
          });
        }}
        onBlur={(e) => {
          messageDispatch({ type: REDUCER_ACTION_TYPE.SET_IS_DIRTY });
        }}
        inputData={messageInput}
      />

      <button
        type="submit"
        className="w-[calc(100%-64px)] button-fill disabled:cursor-default mt-8"
        disabled={!isEnabled}
      >
        send
      </button>
    </form>
  );
};

export default ContactForm;
