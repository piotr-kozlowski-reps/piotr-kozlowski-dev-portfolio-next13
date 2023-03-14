import React from "react";
import InputField from "../InputField";

const ContactSection = () => {
  ////jsx
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full mb-8 ml-16">
        <p className="font-style-h3">GET IN TOUCH</p>
        <p className="font-style-xs -mt-[4px]">
          an idea? a question? a project to help with?
        </p>
      </div>
      <div className="w-full ml-16">
        <form>
          <InputField id="name" name="Name:" placeholder="enter your name" />
          <InputField
            id="email"
            name="E-mail:"
            placeholder="enter your e-mail"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
