import React from "react";

type TModalsChooser = {
  modalChooser: "antePortfolioGithubModal";
};

const ModalsJSXes = ({ modalChooser }: TModalsChooser) => {
  let jsxContent: JSX.Element;

  switch (modalChooser) {
    case "antePortfolioGithubModal":
      jsxContent = (
        <div className="flex flex-col border-t border-main_color bg-background_1_lighter">
          <div className="mx-auto mt-16 font-style-sm">
            Which part of the project code would you like to see?
          </div>
          <div className="block mx-auto mt-8 mb-8 button-outline">
            <a
              href="https://github.com/piotr-kozlowski-reps/ante_app__react"
              target="_blank"
              rel="noopener"
            >
              frontend
            </a>
          </div>
          <div className="block mx-auto mb-16 button-outline">
            <a
              href="https://github.com/piotr-kozlowski-reps/-ante_app__backend"
              target="_blank"
              rel="noopener"
            >
              backend
            </a>
          </div>
        </div>
      );
  }

  ////jsx
  return jsxContent;
};

export default ModalsJSXes;
