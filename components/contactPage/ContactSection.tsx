import React, { Fragment } from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  ////jsx
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full mb-8 ml-16">
          <p className="font-style-h3">GET IN TOUCH</p>
          <p className="font-style-xs -mt-[4px] mb-[22px]">
            an idea? a question? a project to help with?
          </p>
        </div>
        <div className="w-full ml-16">
          <ContactForm />
        </div>
      </div>
    </Fragment>
  );
};

export default ContactSection;
