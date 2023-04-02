import React, { ChangeEvent, FormEvent } from "react";
import { REDUCER_ACTION_TYPE, useFormInput } from "../../hooks/useFormInput";
import InputField from "../ui/InputField";
import {
  checkIfNotEmpty,
  checkIfIsEmail,
} from "../../utils/formInputsChecking";

const ContactForm = () => {
  ////vars
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

  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("submitting");
    console.log(nameInput.inputValue);
    console.log(emailInput.inputValue);
    console.log(messageInput.inputValue);

    clearFormInputs();
  }

  function clearFormInputs() {
    nameDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    emailDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
    messageDispatch({ type: REDUCER_ACTION_TYPE.CLEAR_FORM_INPUT });
  }

  const isAnyInputDirty =
    nameInput.isDirty || emailInput.isDirty || messageInput.isDirty;
  const isEnabled =
    nameInput.isValid &&
    emailInput.isValid &&
    messageInput.isValid &&
    isAnyInputDirty;

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
