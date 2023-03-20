import React, { Fragment } from "react";
import { INotification } from "../../types/typings";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";

interface Props {
  notificationInfo: INotification;
}
const NotificationOverlay = (props: Props) => {
  ////vars
  const { message, status, title } = props.notificationInfo;

  ////classes
  let statusClasses = "";
  if (status === "success") statusClasses = "text-appSuccess";
  if (status === "error") statusClasses = "text-appError";
  const cssClasses = `${statusClasses}`;

  ////jsx
  return ReactDOM.createPortal(
    <div className="fixed opacity-100 z-max ">
      <div className="flex items-center justify-center w-screen h-screen ">
        <div>
          <h1 className={cssClasses}>{title}</h1>
        </div>
        <div>
          <span className={cssClasses}>{message}</span>
        </div>
      </div>
    </div>,
    document.getElementById("loading-hook")!
  );
};

const Notification = (props: INotification) => {
  ////jsx
  return (
    <Fragment>
      <Backdrop />
      <NotificationOverlay notificationInfo={props} />
    </Fragment>
  );
};

export default Notification;
