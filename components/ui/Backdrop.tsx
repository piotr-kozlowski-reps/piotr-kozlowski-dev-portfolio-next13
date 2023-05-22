import React from "react";

type Props = {
  onClick: () => void;
};

const Backdrop = ({ onClick }: Props) => {
  ////jsx
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-background_2_darker z-200 opacity-95"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
