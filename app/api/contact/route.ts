import { NextResponse } from "next/server";
import { TContactFormJson } from "../../../types/typings";
import {
  checkIfNotEmpty,
  checkIfIsEmail,
} from "../../../utils/formInputsChecking";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  //request extract data from json
  //check if data is correct - if not - send Error message
  const resBody: TContactFormJson = await request.json();
  const { name, email, message } = resBody;

  const isNameValid = checkIfNotEmpty(name || "");
  const isEmailValid = checkIfIsEmail(email || "");
  const isMessageValid = checkIfNotEmpty(message || "");

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    return NextResponse.json(
      { message: "Invalid data provided." },
      { status: 400 }
    );
  }

  //// if data is correct send email to me and contact sender
  //Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //internal e-mail
  const outputInternalEmailAsHTML = `
    <p>New contact form request</p>
    <h3>Contact info:</h3>
    <ul>
    <li>Name: ${name}</li>
    <li>E-mail: ${email}</li>
    </ul>
    <h3>Contact details:</h3>
    <p>Message: ${message}</p>
    `;
  const outputInternalEmailAsPlainText = `
    New contact form request
    >Contact info:
    Name: ${name},
    E-mail: ${email},
    >Contact details:
    Message: ${message}
    `;
  const mailOptions = {
    from: `"Nodemailer contact" <${process.env.NODEMAILER_USER}>`, // sender address
    to: `${process.env.NODEMAILER_TO_EMAIL}`, // list of receivers
    subject: "Piotr Kozłowski Developer Portfolio - Contact Form", // Subject line
    text: outputInternalEmailAsPlainText, // plain text body
    html: outputInternalEmailAsHTML, // html body
  };

  /** solution to problem with Vercel: https://stackoverflow.com/questions/65631481/nodemailer-in-vercel-not-sending-email-in-production  
   * Especially last enter:
   * 
   * You need to remove the callback from the nodemailer sendEmail function otherwise it does not return a promise... this cause the script in vercel to be terminated earlier hence not email being sent!

    If callback argument is not set then the method returns a Promise object. Nodemailer itself does not use Promises internally but it wraps the return into a Promise for convenience.

   */
  const sendInternalEmail = async () => {
    await transporter.sendMail(mailOptions);
  };
  try {
    await sendInternalEmail();
    console.log("Internal Email sent");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          "Some issue with automatically sending email has occurred. Please try again.",
      },
      { status: 400 }
    );
  }

  //external email
  const outputClientEmailAsHtmlEn = `
    <h3>Your message has been sent.</h3>
    <br/>
    <h4>Hi, ${name}</h4>
    <p>This email has been sent automatically, don't answer it.</p>
    <p>Your message from contact form has been sent with the data:</p>
    <ul>
    <li>Name: ${name}</li>
    <li>E-mail: ${email}</li>
    <li>Contact Form Message: ${message}</li>
    </ul>
    <br/>
     <p>Thank you, I'll answer as soon as possible.</p>
       <br/>
     <p>Regards,</p>
     <p>Piotr Kozłowski.</p>
    `;
  const outputClientEmailAsPlainText = `
    Your message has been sent.
    Hi, ${name}
    This email has been sent automatically, don't answer it.

    Your message from contact form has been sent with the data:
    Name: ${name}
    E-mail: ${email}
    Contact Form Message: ${message}
 
    Thank you, I'll answer as soon as possible.

     Regards,
     Piotr Kozłowski.
    `;
  const automaticMailOptions = {
    from: `Piotr Kozłowski Developer Portfolio - Contact Form - automatic response <${process.env.NODEMAILER_USER}>`, // sender address
    to: email, // list of receivers
    subject: `Piotr Kozłowski Developer Portfolio - Contact Form - automatic response <${process.env.NODEMAILER_USER}>`, // Subject line
    text: outputClientEmailAsPlainText, // plain text body
    html: outputClientEmailAsHtmlEn, // html body
  };

  /** info above with solution to vercel problem */
  const sendOutputClientEmail = async () => {
    await transporter.sendMail(automaticMailOptions);
  };

  try {
    await sendOutputClientEmail();
    console.log("External Email sent");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          "Some issue with automatically sending email has occurred. Please try again.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Thank you. Your message has been sent.",
  });
}
